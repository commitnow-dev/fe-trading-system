import type { ReactElement } from "react";
import { lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";

import type { OrderResult } from "@/entities/orderbook";
import { OrderModal, usePlaceOrderStore } from "@/features/place-order";
import { PageLayout } from "@/shared/ui/page-layout";
import { ThemeToggle } from "@/shared/ui/theme-toggle";
import { useOrderbookStream } from "@/widgets/order-book";

const LazyOrderBook = lazy(() =>
  import("@/widgets/order-book/ui/order-book").then((module) => ({
    default: module.OrderBook,
  })),
);

export function TradePage(): ReactElement {
  const navigate = useNavigate();
  const { items, isLoading, isError } = useOrderbookStream();
  const selectedPrice = usePlaceOrderStore((state) => state.selectedPrice);
  const setSelectedPrice = usePlaceOrderStore((state) => state.setSelectedPrice);
  const clearSelectedPrice = usePlaceOrderStore((state) => state.clearSelectedPrice);
  const setOrderResult = usePlaceOrderStore((state) => state.setOrderResult);

  const handleSubmitOrder = (result: OrderResult): void => {
    clearSelectedPrice();
    setOrderResult(result);
    navigate("/complete");
  };

  return (
    <PageLayout width="wide" className="flex h-dvh flex-col overflow-hidden pt-8 pb-6">
      <div className="mb-4 flex items-start justify-between gap-4">
        <h1 className="m-0 text-[28px]">실시간 호가 및 주문 시스템</h1>
        <ThemeToggle />
      </div>
      <p className="mt-2 mb-5 text-(--color-text-secondary)">
        호가를 선택해 주문을 진행하세요.
      </p>

      {isLoading && (
        <p className="mb-4 text-(--color-text-secondary)">
          호가 데이터를 불러오는 중입니다...
        </p>
      )}
      {isError && (
        <p className="mb-4 text-(--color-sell)">호가 데이터를 불러오지 못했습니다.</p>
      )}

      <div className="min-h-0 flex-1">
        <Suspense
          fallback={
            <div className="mx-auto h-full w-full max-w-[680px] rounded-md border border-(--color-border-default) bg-(--color-bg-surface)" />
          }
        >
          <LazyOrderBook
            items={items}
            onSelectPrice={(price) => {
              setSelectedPrice(price);
            }}
          />
        </Suspense>
      </div>

      <OrderModal
        isOpen={selectedPrice !== null}
        price={selectedPrice ?? 0}
        onClose={() => {
          clearSelectedPrice();
        }}
        onSubmit={handleSubmitOrder}
      />
    </PageLayout>
  );
}
