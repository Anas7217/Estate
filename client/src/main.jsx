import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import  { persistor,store } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";



// persist is using for storing data, if we are refreshing the page then the data gone but after using persist then the data is storing in "Local Storage"

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  // {/* </React.StrictMode> */}
);
