import React from "react";

const Emergency = () => {
  return (
    <section className="w-[90%] mx-auto my-[120px] bg-gradient-to-br from-[#0097b2] to-[#16324F] rounded-[20px] text-white p-[60px]">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-[50px]">
        {/* Left Section */}
        <div>
          <span className="inline-block bg-white/10 px-4 py-2 rounded-full text-sm font-medium mb-5">
            🚑 24×7 Emergency Support
          </span>

          <h2 className="text-[2.6rem] font-bold mb-5">
            Need Emergency Medical Care?
          </h2>

          <p className="leading-[1.8] max-w-[700px] text-white/90">
            Our emergency department is available 24 hours a day, 7 days a
            week with experienced doctors, ICU facilities, trauma care, and
            ambulance support.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-center gap-5 w-full lg:w-auto">
          <div className="bg-white text-[#16324F] px-[35px] py-5 rounded-xl text-center w-full">
            <h4 className="text-[#0097b2] font-semibold mb-[10px]">
              Emergency Helpline
            </h4>

            <h2 className="text-base tracking-wide font-bold">
              +91 96657 61444
            </h2>
          </div>

          <button className="w-full py-4 bg-[#ff4d4d] text-white rounded-[10px] text-lg font-medium transition duration-300 hover:bg-[#e63946]">
            📞 Call Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Emergency;