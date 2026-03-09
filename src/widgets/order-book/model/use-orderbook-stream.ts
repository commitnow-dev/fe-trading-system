import { useQuery } from "@tanstack/react-query";

import {
  ORDERBOOK_LIST_STALE_TIME_MS,
  ORDERBOOK_UPDATE_INTERVAL_MS,
  type OrderItem,
} from "@/entities/orderbook";
import { fetchOrderbook } from "@/shared/api/orderbook";

const orderbookQueryKeys = {
  all: ["orderbook"] as const,
  list: () => [...orderbookQueryKeys.all, "list"] as const,
};

interface UseOrderbookStreamResult {
  items: OrderItem[];
  isLoading: boolean;
  isError: boolean;
}

export function useOrderbookStream(): UseOrderbookStreamResult {
  const query = useQuery({
    queryKey: orderbookQueryKeys.list(),
    queryFn: fetchOrderbook,
    staleTime: ORDERBOOK_LIST_STALE_TIME_MS,
    refetchInterval: ORDERBOOK_UPDATE_INTERVAL_MS,
  });

  return {
    items: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
