import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Import `createRoot`
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";
import "./styles.css";

// ✅ Use createRoot() instead of render()
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
