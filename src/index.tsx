import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ScrollToTop from "./ScrollToTop";
import App from "./App";

const root = createRoot(document.getElementById("root") as HTMLBodyElement);

root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </Provider>
  // </React.StrictMode>,
);
