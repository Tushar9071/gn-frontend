import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { CookiesProvider } from "react-cookie";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </CookiesProvider>
  </StrictMode>
);
