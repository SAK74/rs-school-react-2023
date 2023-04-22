import { Header, Spinner } from "components";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { HTML } from "components/HTML";
import React, { lazy, Suspense } from "react";
import { Home } from "./views/Home";

const LazyForm = lazy(() => import("./views/Form"));
const LazyAbout = lazy(() => import("./views/About"));
const Lazy404 = lazy(() => import("./views/NotFound"));

function App() {
  return (
    <HTML>
      <div className="App">
        <Header />
        <hr />
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route
            path="about_us"
            element={
              <Suspense fallback={<Spinner />}>
                <LazyAbout />
              </Suspense>
            }
          />
          <Route
            path="form"
            element={
              <Suspense fallback={<Spinner />}>
                <LazyForm />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<Spinner />}>
                <Lazy404 />
              </Suspense>
            }
          />
        </Routes>
        <hr />
      </div>
    </HTML>
  );
}

export default App;
