import React from "react";
import "./App.css";
import Hero from "./components/hero";
import About from "./components/About";
import Services from "./components/Services";
import Doctors from "./components/Doctors"
import Testimonials from "./components/Testimonials"
import Emergency from "./components/Emergency"
import Footer from "./components/Footer"

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