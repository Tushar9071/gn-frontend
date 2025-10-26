import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { CookiesProvider } from "react-cookie";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>

    <CookiesProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Toaster
            position="top-right"
            toastOptions={{
              success: {
                duration: 1000,
                iconTheme: { primary: "green", secondary: "white" },
              },
              error: {
                duration: 1000,
                iconTheme: { primary: "red", secondary: "white" },
              },
            }}
            reverseOrder={true}

          />
          <App />
        </BrowserRouter>
      </Provider>
    </CookiesProvider>
  </StrictMode>
);
