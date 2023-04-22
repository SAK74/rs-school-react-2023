import { RequestHandler } from "express";
import { renderToPipeableStream } from "react-dom/server";
import App from "../src/App";
import { configureStore } from "@reduxjs/toolkit";
import { StoreType } from "../src/store";
import { rootApi } from "../src/services/rtk-query-api";
import searchReducer from "../src/store/searchValueSlice";
import formReducer from "../src/store/formSlice";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom/server";
import React from "react";

const store = configureStore<StoreType>({
  reducer: {
    [rootApi.reducerPath]: rootApi.reducer,
    searchValue: searchReducer,
    form: formReducer,
  },
  preloadedState: {},
});

export const renderHandler: RequestHandler = (req, resp) => {
  const { pipe } = renderToPipeableStream(
    <Provider store={store}>
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
    </Provider>,
    {
      bootstrapScripts: ["client.bundle.js"],
      onShellReady() {
        resp.setHeader("content-type", "text/html");
        pipe(resp), console.log("Success!");
      },
      bootstrapScriptContent: "",
    }
  );
};
