import type { MenuItem } from "@/types/menu";

export type CartLine = {
  item: MenuItem;
  quantity: number;
  notes?: string;
};

export type CartState = {
  items: CartLine[];
  isOpen: boolean;
};

export type CartAction =
  | { type: "ADD"; payload: { item: MenuItem; quantity?: number; notes?: string } }
  | { type: "REMOVE"; payload: { id: string } }
  | { type: "SET_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "UPDATE_NOTES"; payload: { id: string; notes: string } }
  | { type: "CLEAR" }
  | { type: "TOGGLE"; payload?: { open?: boolean } }
  | { type: "HYDRATE"; payload: { items: CartLine[] } };
