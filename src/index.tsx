import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";
import ScrollToTop from "./ScrollToTop";

const root = createRoot(document.getElementById("root") as HTMLBodyElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter forceRefresh>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
