"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type PropsWithChildren,
} from "react";

import { formatCurrency } from "@/lib/utils";
import type { MenuItem } from "@/types/menu";
import type { CartAction, CartLine, CartState } from "@/types/cart";

const STORAGE_KEY = "lilica:cart:v1";
const ENV_WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

const initialState: CartState = {
  items: [],
  isOpen: false,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const quantity = action.payload.quantity ?? 1;
      const notes = action.payload.notes;
      const existing = state.items.find((line) => line.item.id === action.payload.item.id);
      if (existing) {
        return {
          ...state,
          isOpen: true,
          items: state.items.map((line) =>
            line.item.id === action.payload.item.id
              ? {
                  ...line,
                  quantity: Math.min(line.quantity + quantity, 99),
                  notes: notes || line.notes,
                }
              : line,
          ),
        };
      }

      const nextLine: CartLine = {
        item: action.payload.item,
        quantity: Math.min(quantity, 99),
        notes,
      };

      return {
        ...state,
        isOpen: true,
        items: [...state.items, nextLine],
      };
    }
    case "REMOVE": {
      return {
        ...state,
        items: state.items.filter((line) => line.item.id !== action.payload.id),
      };
    }
    case "SET_QUANTITY": {
      const mapped = state.items
        .map((line) => {
          if (line.item.id !== action.payload.id) {
            return line;
          }
          if (action.payload.quantity <= 0) {
            return null;
          }
          return {
            ...line,
            quantity: Math.min(action.payload.quantity, 99),
          };
        })
        .filter(Boolean) as CartLine[];

      return {
        ...state,
        items: mapped,
      };
    }
    case "UPDATE_NOTES": {
      return {
        ...state,
        items: state.items.map((line) =>
          line.item.id === action.payload.id
            ? { ...line, notes: action.payload.notes }
            : line,
        ),
      };
    }
    case "CLEAR": {
      return {
        ...state,
        items: [],
      };
    }
    case "TOGGLE": {
      const isOpen = action.payload?.open ?? !state.isOpen;
      return {
        ...state,
        isOpen,
      };
    }
    case "HYDRATE": {
      return {
        ...state,
        items: action.payload.items,
      };
    }
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartLine[];
  itemCount: number;
  total: number;
  isOpen: boolean;
  addItem: (item: MenuItem, quantity?: number, notes?: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateNotes: (id: string, notes: string) => void;
  clearCart: () => void;
  toggleCart: (open?: boolean) => void;
  buildWhatsAppMessage: (customerName?: string, customerAddress?: string, customerNotes?: string) => string;
  buildWhatsAppLink: (customerName?: string, customerAddress?: string, customerNotes?: string) => string;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

type CartProviderProps = PropsWithChildren<{ whatsappNumber?: string; restaurantName?: string }>;

export function CartProvider({ children, whatsappNumber: configWhatsapp  }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isHydrated, setIsHydrated] = useState(false);
  const whatsappNumber = useMemo(() => {
    const sanitizedConfig = configWhatsapp?.replace(/[^0-9]/g, "") ?? "";
    const fallback = ENV_WHATSAPP.replace(/[^0-9]/g, "");
    return sanitizedConfig || fallback;
  }, [configWhatsapp]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const items: CartLine[] = JSON.parse(stored);
        dispatch({ type: "HYDRATE", payload: { items } });
      }
    } catch (error) {
      console.error("Failed to restore cart state", error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated || typeof window === "undefined") {
      return;
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch (error) {
      console.error("Failed to persist cart state", error);
    }
  }, [state.items, isHydrated]);

  const itemCount = useMemo(
    () => state.items.reduce((total, line) => total + line.quantity, 0),
    [state.items],
  );

  const total = useMemo(
    () => state.items.reduce((sum, line) => sum + line.item.price * line.quantity, 0),
    [state.items],
  );

  const addItem = useCallback(
    (item: MenuItem, quantity = 1, notes?: string) => {
      if (!item.available) {
        return;
      }
      dispatch({ type: "ADD", payload: { item, quantity, notes } });
    },
    [],
  );

  const removeItem = useCallback((id: string) => {
    dispatch({ type: "REMOVE", payload: { id } });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    dispatch({ type: "SET_QUANTITY", payload: { id, quantity } });
  }, []);

  const updateNotes = useCallback((id: string, notes: string) => {
    dispatch({ type: "UPDATE_NOTES", payload: { id, notes } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR" });
  }, []);

  const toggleCart = useCallback((open?: boolean) => {
    dispatch({ type: "TOGGLE", payload: { open } });
  }, []);

  const buildWhatsAppMessage = useCallback((customerName?: string, customerAddress?: string, customerNotes?: string) => {
    const itemLines = state.items.map((line) => {
      const unitPrice = formatCurrency(line.item.price);
      const notesText = line.notes ? ` [obs: ${line.notes}]` : "";
      return `- ${line.quantity}x ${line.item.name} — ${unitPrice}${notesText}`;
    });

    const messageParts = [
      "Olá, gostaria de fazer um pedido:",
      "",
      "*Itens:*",
      ...itemLines,
      "",
      `*Subtotal:* ${formatCurrency(total)}`,
    ];

    if (customerName || customerAddress || customerNotes) {
      messageParts.push("");
      messageParts.push("*Dados do cliente:*");
      if (customerName) {
        messageParts.push(`Nome: ${customerName}`);
      }
      if (customerAddress) {
        messageParts.push(`Endereço/Entrega: ${customerAddress}`);
      }
      if (customerNotes) {
        messageParts.push(`Observações gerais: ${customerNotes}`);
      }
    }

    messageParts.push("");
    messageParts.push("_Enviado pelo cardápio online._");

    return messageParts.join("\n");
  }, [state.items, total]);

  const buildWhatsAppLink = useCallback((customerName?: string, customerAddress?: string, customerNotes?: string) => {
    const message = encodeURIComponent(buildWhatsAppMessage(customerName, customerAddress, customerNotes));
    const baseUrl = whatsappNumber ? `https://wa.me/5516991431147` : "https://wa.me/5516991431147";
    return `${baseUrl}?text=${message}`;
  }, [buildWhatsAppMessage, whatsappNumber]);

  const value = useMemo(
    () => ({
      items: state.items,
      itemCount,
      total,
      isOpen: state.isOpen,
      addItem,
      removeItem,
      updateQuantity,
      updateNotes,
      clearCart,
      toggleCart,
      buildWhatsAppMessage,
      buildWhatsAppLink,
    }),
    [
      state.items,
      state.isOpen,
      itemCount,
      total,
      addItem,
      removeItem,
      updateQuantity,
      updateNotes,
      clearCart,
      toggleCart,
      buildWhatsAppMessage,
      buildWhatsAppLink,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de CartProvider");
  }
  return context;
}
