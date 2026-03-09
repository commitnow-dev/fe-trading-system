import { isOrderItem, ORDERBOOK_ENDPOINT, type OrderItem } from "@/entities/orderbook";

interface OrderbookResponse {
  items: OrderItem[];
}

function isOrderbookResponse(value: unknown): value is OrderbookResponse {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  if (!Array.isArray(candidate.items)) {
    return false;
  }

  return candidate.items.every((item) => isOrderItem(item));
}

export async function fetchOrderbook(): Promise<OrderItem[]> {
  const response = await fetch(ORDERBOOK_ENDPOINT);

  if (!response.ok) {
    throw new Error(`Failed to fetch orderbook: ${response.status}`);
  }

  const payload: unknown = await response.json();

  if (!isOrderbookResponse(payload)) {
    throw new Error("Invalid orderbook response");
  }

  return payload.items;
}
