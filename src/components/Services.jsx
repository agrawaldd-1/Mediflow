import React from "react";

const Services = () => {
  return (
    <section className="w-[90%] mx-auto my-24">
      {/* Section Heading */}
      <div className="text-center mb-16">
        <span className="text-[#0097b2] tracking-[2px] font-bold">
          OUR SERVICES
        </span>

        <h2 className="text-[2.7rem] text-[#16324F] my-[15px] font-bold">
          Healthcare Services We Provide
        </h2>

        <p className="w-full md:w-[60%] mx-auto text-[#666] leading-[1.8]">
          Comprehensive healthcare solutions delivered by experienced
          specialists using advanced medical technology.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[30px]">
        <div className="bg-white rounded-[18px] p-[35px] shadow-[0_12px_35px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_18px_40px_rgba(0,0,0,0.12)]">
          <div className="w-[70px] h-[70px] bg-[#eaf8fb] rounded-full flex items-center justify-center text-[34px] mb-[25px]">
            🩺
          </div>

          <h3 className="text-[#16324F] text-xl font-semibold mb-[15px]">
            General Consultation
          </h3>

          <p className="text-[#666] leading-[1.8]">
            Expert physicians providing diagnosis, treatment, and preventive
            healthcare.
          </p>
        </div>

        <div className="bg-white rounded-[18px] p-[35px] shadow-[0_12px_35px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_18px_40px_rgba(0,0,0,0.12)]">
          <div className="w-[70px] h-[70px] bg-[#eaf8fb] rounded-full flex items-center justify-center text-[34px] mb-[25px]">
            ❤️
          </div>

          <h3 className="text-[#16324F] text-xl font-semibold mb-[15px]">
            Cardiology
          </h3>

          <p className="text-[#666] leading-[1.8]">
            Advanced heart care including ECG, angiography, and cardiac surgery.
          </p>
        </div>

        <div className="bg-white rounded-[18px] p-[35px] shadow-[0_12px_35px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_18px_40px_rgba(0,0,0,0.12)]">
          <div className="w-[70px] h-[70px] bg-[#eaf8fb] rounded-full flex items-center justify-center text-[34px] mb-[25px]">
            🧠
          </div>

          <h3 className="text-[#16324F] text-xl font-semibold mb-[15px]">
            Neurology
          </h3>

          <p className="text-[#666] leading-[1.8]">
            Comprehensive treatment for brain, spine, and nervous system
            disorders.
          </p>
        </div>

        <div className="bg-white rounded-[18px] p-[35px] shadow-[0_12px_35px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_18px_40px_rgba(0,0,0,0.12)]">
          <div className="w-[70px] h-[70px] bg-[#eaf8fb] rounded-full flex items-center justify-center text-[34px] mb-[25px]">
            🦴
          </div>

          <h3 className="text-[#16324F] text-xl font-semibold mb-[15px]">
            Orthopedics
          </h3>

          <p className="text-[#666] leading-[1.8]">
            Bone, joint, and sports injury treatment with advanced surgical
            care.
          </p>
        </div>

        <div className="bg-white rounded-[18px] p-[35px] shadow-[0_12px_35px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_18px_40px_rgba(0,0,0,0.12)]">
          <div className="w-[70px] h-[70px] bg-[#eaf8fb] rounded-full flex items-center justify-center text-[34px] mb-[25px]">
            🧪
          </div>

          <h3 className="text-[#16324F] text-xl font-semibold mb-[15px]">
            Diagnostics
          </h3>

          <p className="text-[#666] leading-[1.8]">
            Modern pathology laboratory with fast and accurate test reports.
          </p>
        </div>

        <div className="bg-white rounded-[18px] p-[35px] shadow-[0_12px_35px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_18px_40px_rgba(0,0,0,0.12)]">
          <div className="w-[70px] h-[70px] bg-[#eaf8fb] rounded-full flex items-center justify-center text-[34px] mb-[25px]">
            🚑
          </div>

          <h3 className="text-[#16324F] text-xl font-semibold mb-[15px]">
            Emergency Care
          </h3>

          <p className="text-[#666] leading-[1.8]">
            24×7 emergency services with ICU, trauma care, and ambulance
            support.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;