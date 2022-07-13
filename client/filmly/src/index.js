import React from "react";
import ReactDOM from "react-dom/client";
import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "./App.css";

// Reducers
import authReducer from "./store/reducers/auth";

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
});

// Creating redux store with redux-thunk as a middleware
const store = createStore(rootReducer, applyMiddleware(thunk));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
