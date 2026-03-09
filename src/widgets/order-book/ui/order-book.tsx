import type { ReactElement } from "react";
import type { OrderItem } from "@/entities/orderbook";
import { formatNumber } from "@/shared/lib/number-format";

interface OrderBookProps {
  items: OrderItem[];
  onSelectPrice: (price: number) => void;
}

function typeToLabel(type: OrderItem["type"]): string {
  return type === "buy" ? "매수" : "매도";
}

export function OrderBook({ items, onSelectPrice }: OrderBookProps): ReactElement {
  return (
    <section
      className="mx-auto w-full max-w-[680px] overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border-default)] bg-[var(--color-bg-surface)]"
      aria-label="실시간 호가창"
    >
      <header className="grid grid-cols-[120px_1fr_120px] bg-[var(--color-bg-page)] px-4 py-3 font-semibold text-[var(--color-text-secondary)]">
        <span>유형</span>
        <span>가격</span>
        <span>잔량</span>
      </header>
      <ul className="m-0 list-none p-0">
        {items.map((item) => (
          <li
            key={item.id}
            className="border-t border-[var(--color-border-muted)] first:border-t-0"
          >
            <button
              type="button"
              className="grid w-full grid-cols-[120px_1fr_120px] items-center bg-transparent px-4 py-3 text-left hover:bg-[var(--color-bg-page)]"
              onClick={() => {
                onSelectPrice(item.price);
              }}
            >
              <span
                className={`font-semibold ${item.type === "buy" ? "text-[var(--color-buy)]" : "text-[var(--color-sell)]"}`}
              >
                {typeToLabel(item.type)}
              </span>
              <span>{formatNumber(item.price)}</span>
              <span>{formatNumber(item.quantity)}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
