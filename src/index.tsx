import React from "react";
import { hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "store";

delete window.__PRELOADED_STATE__;

const element = (
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
const root = document.getElementById("root") as HTMLElement;
hydrateRoot(root, element);
