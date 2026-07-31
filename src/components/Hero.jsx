import React from "react";
import heroImage from "../assets/hero-1.png";
import { Link} from "react-router-dom";
const Hero = () => {
  return (
    <section
      className="w-full h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${heroImage})`,
      }}
    >
      <div className="w-[70%] text-center text-white">
        <h1 className="mt-[50px] mb-5 text-5xl md:text-6xl font-bold">
          Mediflow Hospital
        </h1>

        <p className="text-lg leading-8 mb-9">
          Advanced Healthcare. Compassionate Care. Modern Technology.
        </p>

        <Link to = "/login"><button className="px-9 py-4 bg-[#0097b2] text-white text-lg rounded-lg transition duration-300 hover:bg-[#00758a]">
          Login
        </button></Link>
      </div>
    </section>
  );
};

export default Hero;