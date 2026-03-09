import type { ReactElement } from "react";
import { Link } from "react-router-dom";

import { usePlaceOrderStore } from "@/features/place-order";
import { formatNumber } from "@/shared/lib/number-format";
import { PageLayout } from "@/shared/ui/page-layout";

function toTypeLabel(type: "buy" | "sell"): string {
  return type === "buy" ? "매수" : "매도";
}

export function CompletePage(): ReactElement {
  const orderResult = usePlaceOrderStore((state) => state.orderResult);
  const clearOrderResult = usePlaceOrderStore((state) => state.clearOrderResult);

  if (!orderResult) {
    return (
      <PageLayout width="narrow">
        <h1 className="m-0 mb-5">주문 정보를 찾을 수 없습니다.</h1>
        <Link
          className="mt-[18px] inline-block rounded-sm bg-(--color-cta) px-3.5 py-2.5 text-(--color-on-accent) no-underline"
          to="/trade"
        >
          다시 거래하기
        </Link>
      </PageLayout>
    );
  }

  return (
    <PageLayout width="narrow">
      <h1 className="m-0 mb-5">주문이 완료되었습니다.</h1>
      <section
        className="rounded-md border border-(--color-border-default) bg-(--color-bg-surface) p-[18px]"
        aria-label="주문 요약"
      >
        <div className="flex items-center justify-between gap-4 py-2.5">
          <span>주문 타입</span>
          <strong>{toTypeLabel(orderResult.type)}</strong>
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-(--color-border-muted) py-2.5">
          <span>가격</span>
          <strong>{formatNumber(orderResult.price)} KRW</strong>
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-(--color-border-muted) py-2.5">
          <span>수량</span>
          <strong>{formatNumber(orderResult.quantity)}</strong>
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-(--color-border-muted) py-2.5">
          <span>총금액</span>
          <strong>{formatNumber(orderResult.totalPrice)} KRW</strong>
        </div>
      </section>
      <Link
        className="mt-[18px] inline-block rounded-sm bg-(--color-cta) px-3.5 py-2.5 text-(--color-on-accent) no-underline"
        to="/trade"
        onClick={() => {
          clearOrderResult();
        }}
      >
        다시 거래하기
      </Link>
    </PageLayout>
  );
}
