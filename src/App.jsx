import React from "react";
import "./App.css";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Services from "./components/Services.jsx";
import Doctors from "./components/Doctors.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Emergency from "./components/Emergency.jsx";
import Footer from "./components/Footer.jsx";
import Login from "./Login.jsx";
import { createBrowserRouter, RouterContextProvider, RouterProvider, useNavigate } from 'react-router-dom'


const App = () => {
 
  return (
    <>
      <Hero/>
      <About/>
      <Services/>
      <Doctors/>
      <Testimonials/>
      <Emergency/>
      <Footer/>
      
      
    </>
  );
};

export default App;