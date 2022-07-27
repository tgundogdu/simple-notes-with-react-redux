import React from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./layouts/header";
import Router from "./router/router";
import store from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <main className="page-wrapper">
        <Router />
      </main>
      <ToastContainer position="bottom-right" autoClose={1000} newestOnTop theme="colored"/>
    </Provider>
  );
};

export default App;
