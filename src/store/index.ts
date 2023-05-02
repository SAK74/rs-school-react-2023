declare global {
  var __PRELOADED_STATE__: object | undefined; // eslint-disable-line
}

export { store as default } from "./store";
export * from "./store";
export { default as formReducer } from "./formSlice";
export { default as searchReducer } from "./searchValueSlice";
