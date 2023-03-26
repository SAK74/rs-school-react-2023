// import React from 'react';
import { Header } from "components";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { About, Form, Home, NotFound } from "views";

function App() {
  return (
    <div className="App">
      <Header />
      <hr />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about_us" element={<About />} />
        <Route path="form" element={<Form />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <hr />
    </div>
  );
}

export default App;
