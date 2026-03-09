import type { ReactElement } from "react";
import { Link, useLocation } from "react-router-dom";

import { type CompletePageState, isCompletePageState } from "@/features/place-order";
import { formatNumber } from "@/shared/lib/number-format";

function toTypeLabel(type: "buy" | "sell"): string {
  return type === "buy" ? "매수" : "매도";
}

export function CompletePage(): ReactElement {
  const location = useLocation();

  if (!isCompletePageState(location.state)) {
    return (
      <main className="mx-auto max-w-[520px] px-4 py-10">
        <h1 className="m-0 mb-5">주문 정보를 찾을 수 없습니다.</h1>
        <Link
          className="mt-[18px] inline-block rounded-[var(--radius-sm)] bg-[var(--color-cta)] px-3.5 py-2.5 text-[var(--color-on-accent)] no-underline"
          to="/trade"
        >
          다시 거래하기
        </Link>
      </main>
    );
  }

  const { orderResult } = location.state as CompletePageState;

  return (
    <main className="mx-auto max-w-[520px] px-4 py-10">
      <h1 className="m-0 mb-5">주문이 완료되었습니다.</h1>
      <section
        className="rounded-[var(--radius-md)] border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] p-[18px]"
        aria-label="주문 요약"
      >
        <div className="flex items-center justify-between gap-4 py-2.5">
          <span>주문 타입</span>
          <strong>{toTypeLabel(orderResult.type)}</strong>
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-[var(--color-border-muted)] py-2.5">
          <span>가격</span>
          <strong>{formatNumber(orderResult.price)} KRW</strong>
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-[var(--color-border-muted)] py-2.5">
          <span>수량</span>
          <strong>{formatNumber(orderResult.quantity)}</strong>
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-[var(--color-border-muted)] py-2.5">
          <span>총금액</span>
          <strong>{formatNumber(orderResult.totalPrice)} KRW</strong>
        </div>
      </section>
      <Link
        className="mt-[18px] inline-block rounded-[var(--radius-sm)] bg-[var(--color-cta)] px-3.5 py-2.5 text-[var(--color-on-accent)] no-underline"
        to="/trade"
      >
        다시 거래하기
      </Link>
    </main>
  );
}
