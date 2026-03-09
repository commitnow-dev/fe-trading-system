import { http, HttpResponse } from "msw";

import {
  generateOrderbook,
  nextBasePrice,
  ORDERBOOK_DEFAULT_BASE_PRICE,
  ORDERBOOK_DEFAULT_DEPTH,
  ORDERBOOK_ENDPOINT,
} from "@/entities/orderbook";

let basePrice = ORDERBOOK_DEFAULT_BASE_PRICE;

export const handlers = [
  http.get(ORDERBOOK_ENDPOINT, () => {
    basePrice = nextBasePrice(basePrice);

    return HttpResponse.json({
      items: generateOrderbook({
        basePrice,
        depth: ORDERBOOK_DEFAULT_DEPTH,
      }),
    });
  }),
];
