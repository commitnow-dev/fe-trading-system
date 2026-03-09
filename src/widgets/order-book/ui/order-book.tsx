import type { ReactElement } from "react";
import { useMemo } from "react";
import {
  AllCommunityModule,
  ModuleRegistry,
  type ColDef,
  type RowClickedEvent,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

import type { OrderItem } from "@/entities/orderbook";
import { formatNumber } from "@/shared/lib/number-format";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

ModuleRegistry.registerModules([AllCommunityModule]);

interface OrderBookProps {
  items: OrderItem[];
  onSelectPrice: (price: number) => void;
}

function typeToLabel(type: OrderItem["type"]): string {
  return type === "buy" ? "매수" : "매도";
}

export function OrderBook({ items, onSelectPrice }: OrderBookProps): ReactElement {
  const columnDefs = useMemo<ColDef<OrderItem>[]>(
    () => [
      {
        headerName: "유형",
        field: "type",
        width: 120,
        minWidth: 120,
        maxWidth: 120,
        valueFormatter: (params) => typeToLabel(params.value as OrderItem["type"]),
        cellClass: (params) =>
          params.data?.type === "buy"
            ? "orderbook-cell-type-buy"
            : "orderbook-cell-type-sell",
      },
      {
        headerName: "가격",
        field: "price",
        flex: 1,
        valueFormatter: (params) => formatNumber(Number(params.value ?? 0)),
        cellClass: (params) =>
          params.data?.type === "buy"
            ? "orderbook-cell-price-buy"
            : "orderbook-cell-price-sell",
      },
      {
        headerName: "잔량",
        field: "quantity",
        width: 120,
        minWidth: 120,
        maxWidth: 120,
        valueFormatter: (params) => formatNumber(Number(params.value ?? 0)),
      },
    ],
    [],
  );

  const defaultColDef = useMemo<ColDef<OrderItem>>(
    () => ({
      sortable: false,
      filter: false,
      suppressMovable: true,
    }),
    [],
  );

  const handleRowClick = (event: RowClickedEvent<OrderItem>): void => {
    if (!event.data) {
      return;
    }

    onSelectPrice(event.data.price);
  };

  return (
    <section
      className="mx-auto flex h-full w-full max-w-[680px] flex-col overflow-hidden"
      aria-label="실시간 호가창"
    >
      <div className="ag-theme-quartz orderbook-grid-theme h-full w-full">
        <AgGridReact<OrderItem>
          rowData={items}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          getRowId={(params) => params.data.id}
          animateRows={true}
          rowHeight={48}
          headerHeight={48}
          suppressRowHoverHighlight={false}
          getRowClass={(params) =>
            params.data?.type === "buy" ? "orderbook-row-buy" : "orderbook-row-sell"
          }
          onRowClicked={handleRowClick}
        />
      </div>
    </section>
  );
}
