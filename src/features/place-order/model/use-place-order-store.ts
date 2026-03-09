import { create } from "zustand";

import type { OrderResult } from "@/entities/orderbook";

interface PlaceOrderState {
  selectedPrice: number | null;
  orderResult: OrderResult | null;
  setSelectedPrice: (price: number) => void;
  clearSelectedPrice: () => void;
  setOrderResult: (result: OrderResult) => void;
  clearOrderResult: () => void;
}

export const usePlaceOrderStore = create<PlaceOrderState>((set) => ({
  selectedPrice: null,
  orderResult: null,
  setSelectedPrice: (price: number) => {
    set({ selectedPrice: price });
  },
  clearSelectedPrice: () => {
    set({ selectedPrice: null });
  },
  setOrderResult: (result: OrderResult) => {
    set({ orderResult: result });
  },
  clearOrderResult: () => {
    set({ orderResult: null });
  },
}));
