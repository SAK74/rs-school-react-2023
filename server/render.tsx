import { RequestHandler } from "express";
import { renderToPipeableStream } from "react-dom/server";
import App from "../src/App";
import { configureStore } from "@reduxjs/toolkit";
import { rootApi } from "../src/services/rtk-query-api";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom/server";
import React from "react";
import { formReducer, searchReducer } from "store";

const store = configureStore({
  reducer: {
    [rootApi.reducerPath]: rootApi.reducer,
    searchValue: searchReducer,
    form: formReducer,
  },
  middleware: (getDefault) => getDefault().concat(rootApi.middleware),

  // preloadedState: {},
});
rootApi.endpoints.getAll.initiate({});
await Promise.all(store.dispatch(rootApi.util.getRunningMutationsThunk()));

const initialState = store.getState();

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
      onError(error) {
        console.log("Server error: ", error);
      },
      bootstrapScriptContent: `window.__PRELOADED_STATE__=${JSON.stringify(
        initialState
      )}`,
    }
  );
};
