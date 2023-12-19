import React from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import About from "./pages/About";

const App = () => {
  return (
    // <>
    //   {/* <h1 className="text-3xl text-red-500 font-bold underline">
    //     Hello world h!
    //   </h1> */}
    //   <h1 className="text-green-500">this is h1</h1>
    //   <h2>this is h2</h2>
    //   <Header />
    // </>

    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<Signin />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/about' element={<About />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
