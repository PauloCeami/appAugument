"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ConfirmOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (customerName: string, customerAddress: string, customerNotes: string) => void;
}

export function ConfirmOrderModal({ isOpen, onClose, onConfirm }: ConfirmOrderModalProps) {
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      return;
    }
    onConfirm(customerName.trim(), customerAddress.trim(), customerNotes.trim());
    // Reset form
    setCustomerName("");
    setCustomerAddress("");
    setCustomerNotes("");
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Confirmar pedido"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-3xl border border-[#e7dccd] bg-[#fdf7ef] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between border-b border-[#e7dccd] bg-[#f6ecde]/90 px-6 py-5 backdrop-blur">
          <div>
            <h2 className="text-xl font-semibold text-[#4c3823]">
              Confirmar pedido
            </h2>
            <p className="text-sm text-[#9a8263]">
              Preencha seus dados para enviar
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#6a5336] shadow hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d3a06f]"
            aria-label="Fechar modal"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="customer-name" className="text-sm font-medium text-[#4c3823]">
              Nome <span className="text-red-600">*</span>
            </label>
            <Input
              id="customer-name"
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Seu nome completo"
              required
              autoFocus
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="customer-address" className="text-sm font-medium text-[#4c3823]">
              Endereço/Entrega <span className="text-sm text-[#9a8263]">(opcional)</span>
            </label>
            <Input
              id="customer-address"
              type="text"
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              placeholder="Rua, número, complemento"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="customer-notes" className="text-sm font-medium text-[#4c3823]">
              Observações do pedido <span className="text-sm text-[#9a8263]">(opcional)</span>
            </label>
            <textarea
              id="customer-notes"
              value={customerNotes}
              onChange={(e) => setCustomerNotes(e.target.value)}
              placeholder="Ex: sem cebola, entregar na portaria..."
              rows={3}
              className="w-full rounded-2xl border border-[#e7dccd] bg-white px-4 py-3 text-sm text-[#4c3823] placeholder:text-[#c4b5a0] focus:border-[#d3a06f] focus:outline-none focus:ring-2 focus:ring-[#d3a06f]/20"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white text-[#6a5336] hover:bg-[#f6ecde] border border-[#e7dccd]"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={!customerName.trim()}
            >
              Enviar pelo WhatsApp
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

