import type { OrderResult } from "@/entities/orderbook";

export interface CompletePageState {
  orderResult: OrderResult;
}

function isOrderResult(value: unknown): value is OrderResult {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  const type = candidate.type;

  return (
    (type === "buy" || type === "sell") &&
    typeof candidate.price === "number" &&
    Number.isFinite(candidate.price) &&
    typeof candidate.quantity === "number" &&
    Number.isFinite(candidate.quantity) &&
    typeof candidate.totalPrice === "number" &&
    Number.isFinite(candidate.totalPrice)
  );
}

export function isCompletePageState(value: unknown): value is CompletePageState {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return isOrderResult(candidate.orderResult);
}
