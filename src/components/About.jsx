import React from "react";

const About = () => {
  return (
    <section className="w-[90%] mx-auto my-20 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-16">
      {/* Left Section */}
      <div>
        <span className="text-[#0097b2] font-bold tracking-[2px]">
          ABOUT US
        </span>

        <h2 className="text-[2.6rem] text-[#1d3557] my-[15px] mb-[25px] font-bold leading-tight">
          Excellence in Healthcare,
          <br />
          Compassion in Every Treatment.
        </h2>

        <p className="text-[#555] leading-[1.9] mb-5 text-justify">
          MediFlow Hospital is a modern multi-speciality healthcare institution
          dedicated to providing comprehensive, patient-centered medical
          services through clinical excellence, innovation, and compassion.
        </p>

        <p className="text-[#555] leading-[1.9] mb-5 text-justify">
          Our hospital combines experienced doctors with advanced diagnostic
          facilities to ensure every patient receives the highest standard of
          care.
        </p>

        <p className="text-[#555] leading-[1.9] text-justify">
          From preventive healthcare to emergency treatment and advanced
          surgeries, MediFlow delivers reliable healthcare with a patient-first
          approach.
        </p>
      </div>

      {/* Right Section */}
      <div className="grid grid-cols-2 gap-5">
        <div className="bg-white rounded-[15px] p-[35px_20px] text-center shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-2.5">
          <h3 className="text-[#0097b2] text-[2rem] mb-[10px] font-bold">
            20+
          </h3>
          <p className="text-[#555]">Departments</p>
        </div>

        <div className="bg-white rounded-[15px] p-[35px_20px] text-center shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-2.5">
          <h3 className="text-[#0097b2] text-[2rem] mb-[10px] font-bold">
            150+
          </h3>
          <p className="text-[#555]">Doctors</p>
        </div>

        <div className="bg-white rounded-[15px] p-[35px_20px] text-center shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-2.5">
          <h3 className="text-[#0097b2] text-[2rem] mb-[10px] font-bold">
            50K+
          </h3>
          <p className="text-[#555]">Patients Treated</p>
        </div>

        <div className="bg-white rounded-[15px] p-[35px_20px] text-center shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-2.5">
          <h3 className="text-[#0097b2] text-[2rem] mb-[10px] font-bold">
            24×7
          </h3>
          <p className="text-[#555]">Emergency Care</p>
        </div>
      </div>
    </section>
  );
};

export default About;