import { useState } from "react";
import type { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

import type { OrderResult } from "@/entities/orderbook";
import { OrderModal } from "@/features/place-order";
import { OrderBook, useOrderbookStream } from "@/widgets/order-book";

export function TradePage(): ReactElement {
  const navigate = useNavigate();
  const { items, isLoading, isError } = useOrderbookStream();
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);

  const handleSubmitOrder = (result: OrderResult): void => {
    setSelectedPrice(null);
    navigate("/complete", { state: { orderResult: result } });
  };

  return (
    <main className="mx-auto max-w-[860px] px-4 pt-8 pb-16 overflow-hidden">
      <h1 className="m-0 text-[28px]">실시간 호가 및 주문 시스템</h1>
      <p className="mt-2 mb-5 text-(--color-text-secondary)">
        호가를 선택해 주문을 진행하세요.
      </p>

      {isLoading ? (
        <p className="mb-4 text-(--color-text-secondary)">
          호가 데이터를 불러오는 중입니다...
        </p>
      ) : null}
      {isError ? (
        <p className="mb-4 text-(--color-sell)">호가 데이터를 불러오지 못했습니다.</p>
      ) : null}

      <OrderBook
        items={items}
        onSelectPrice={price => {
          setSelectedPrice(price);
        }}
      />

      <OrderModal
        isOpen={selectedPrice !== null}
        price={selectedPrice ?? 0}
        onClose={() => {
          setSelectedPrice(null);
        }}
        onSubmit={handleSubmitOrder}
      />
    </main>
  );
}
