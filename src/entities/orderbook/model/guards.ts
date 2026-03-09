import type { OrderItem, OrderType } from "./types";

function isOrderType(value: unknown): value is OrderType {
  return value === "buy" || value === "sell";
}

export function isOrderItem(value: unknown): value is OrderItem {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.price === "number" &&
    Number.isFinite(candidate.price) &&
    typeof candidate.quantity === "number" &&
    Number.isFinite(candidate.quantity) &&
    isOrderType(candidate.type)
  );
}
