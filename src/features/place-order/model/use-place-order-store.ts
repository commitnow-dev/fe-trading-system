import { create } from "zustand";

import type { OrderResult } from "@/entities/orderbook";

interface SelectedQuote {
  price: number;
  quantity: number;
}

interface PlaceOrderState {
  selectedQuote: SelectedQuote | null;
  orderResult: OrderResult | null;
  setSelectedQuote: (quote: SelectedQuote) => void;
  clearSelectedQuote: () => void;
  setOrderResult: (result: OrderResult) => void;
  clearOrderResult: () => void;
}

export const usePlaceOrderStore = create<PlaceOrderState>((set) => ({
  selectedQuote: null,
  orderResult: null,
  setSelectedQuote: (quote: SelectedQuote) => {
    set({ selectedQuote: quote });
  },
  clearSelectedQuote: () => {
    set({ selectedQuote: null });
  },
  setOrderResult: (result: OrderResult) => {
    set({ orderResult: result });
  },
  clearOrderResult: () => {
    set({ orderResult: null });
  },
}));
