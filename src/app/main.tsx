import React from "react";
import ReactDOM from "react-dom/client";

import { QueryProvider } from "./providers/query-provider";
import { AppRouter } from "./router";
import "./styles/global.css";

async function enableMocking(): Promise<void> {
  if (!import.meta.env.DEV) {
    return;
  }

  const { worker } = await import("@/mocks/browser");
  await worker.start({
    onUnhandledRequest: "bypass",
  });
}

function renderApp(): void {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <QueryProvider>
        <AppRouter />
      </QueryProvider>
    </React.StrictMode>,
  );
}

void enableMocking().then(renderApp);
