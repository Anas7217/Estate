import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import  { persistor,store } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";



// persist is using for storing data, if we are refreshing the page then the data gone but after using persist then the data is storing in "Local Storage"

ReactDOM.createRoot(document.getElementById("root")).render(

  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
 
);
