import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactElement } from "react";

import type { OrderType } from "@/entities/orderbook";
import { formatNumber } from "@/shared/lib/number-format";

import { createOrderResult, isValidQuantity } from "../model/place-order";

interface OrderModalProps {
  isOpen: boolean;
  price: number;
  onClose: () => void;
  onSubmit: (result: ReturnType<typeof createOrderResult>) => void;
}

type FormError = "EMPTY" | "NOT_INTEGER" | "INVALID";

function toErrorMessage(error: FormError | null): string {
  switch (error) {
    case "EMPTY":
      return "수량을 입력해 주세요.";
    case "NOT_INTEGER":
      return "수량은 정수여야 합니다.";
    case "INVALID":
      return "수량은 1 이상이어야 합니다.";
    default:
      return "";
  }
}

export function OrderModal({
  isOpen,
  price,
  onClose,
  onSubmit,
}: OrderModalProps): ReactElement {
  const [quantityInput, setQuantityInput] = useState<string>("1");
  const [error, setError] = useState<FormError | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const parsedQuantity = useMemo(() => Number(quantityInput), [quantityInput]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
      return;
    }

    if (dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  const handleDialogClose = (): void => {
    setError(null);
    onClose();
  };

  const closeModal = (): void => {
    dialogRef.current?.close();
  };

  const submitOrder = (type: OrderType): void => {
    if (quantityInput.trim().length === 0) {
      setError("EMPTY");
      return;
    }

    if (!Number.isInteger(parsedQuantity)) {
      setError("NOT_INTEGER");
      return;
    }

    if (!isValidQuantity(parsedQuantity)) {
      setError("INVALID");
      return;
    }

    const result = createOrderResult({
      type,
      price,
      quantity: parsedQuantity,
    });

    setError(null);
    closeModal();
    onSubmit(result);
    setQuantityInput("1");
  };

  return (
    <dialog
      ref={dialogRef}
      className="w-[min(92vw,360px)] rounded-md border-0 bg-(--color-bg-surface) p-5 shadow-[0_12px_30px_rgba(0,0,0,0.22)] backdrop:bg-(--color-overlay)"
      onClose={handleDialogClose}
      onCancel={(event) => {
        event.preventDefault();
        closeModal();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          closeModal();
        }
      }}
    >
      <h2 id="order-modal-title" className="m-0 mb-3 text-xl">
        주문하기
      </h2>
      <p className="m-0 mb-4 text-(--color-text-secondary)">
        선택 가격: {formatNumber(price)} KRW
      </p>

      <label className="mb-2 block text-sm" htmlFor="order-quantity">
        수량
      </label>
      <input
        id="order-quantity"
        className="w-full rounded-sm border border-(--color-border-default) p-2.5"
        type="number"
        min={1}
        step={1}
        value={quantityInput}
        onChange={(event) => {
          setQuantityInput(event.target.value);
        }}
      />
      {error ? (
        <p className="mt-2 mb-0 text-sm text-(--color-sell)" role="alert">
          {toErrorMessage(error)}
        </p>
      ) : null}

      <div className="mt-[18px] flex gap-2.5">
        <button
          type="button"
          className="flex-1 cursor-pointer rounded-sm border-0 bg-(--color-buy) py-2.5 font-semibold text-(--color-on-accent)"
          onClick={() => {
            submitOrder("buy");
          }}
        >
          매수
        </button>
        <button
          type="button"
          className="flex-1 cursor-pointer rounded-sm border-0 bg-(--color-sell) py-2.5 font-semibold text-(--color-on-accent)"
          onClick={() => {
            submitOrder("sell");
          }}
        >
          매도
        </button>
      </div>
    </dialog>
  );
}
