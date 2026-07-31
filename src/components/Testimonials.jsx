import React from "react";

const Testimonials = () => {
  return (
    <section className="w-[90%] mx-auto my-24">
      {/* Section Heading */}
      <div className="text-center mb-16">
        <span className="text-[#0097b2] tracking-[2px] font-bold">
          TESTIMONIALS
        </span>

        <h2 className="text-[2.7rem] text-[#16324F] font-bold my-[15px]">
          What Our Patients Say
        </h2>

        <p className="w-full md:w-[60%] mx-auto text-[#666] leading-[1.8]">
          Thousands of patients trust MediFlow Hospital for quality healthcare
          and compassionate treatment.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
        {/* Card 1 */}
        <div className="bg-white rounded-[18px] p-[35px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-2.5">
          <div className="text-[#FFD700] text-2xl mb-5">★★★★★</div>

          <p className="text-[#555] leading-[1.8] mb-[25px]">
            "The doctors were highly professional and caring. My surgery was
            successful and the entire staff supported me throughout the
            recovery."
          </p>

          <h3 className="text-[#16324F] text-xl font-semibold">
            Rahul Sharma
          </h3>

          <span className="text-[#0097b2]">Cardiology Patient</span>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-[18px] p-[35px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-2.5">
          <div className="text-[#FFD700] text-2xl mb-5">★★★★★</div>

          <p className="text-[#555] leading-[1.8] mb-[25px]">
            "Booking appointments was effortless and the hospital facilities are
            world-class. Highly recommended."
          </p>

          <h3 className="text-[#16324F] text-xl font-semibold">
            Priya Verma
          </h3>

          <span className="text-[#0097b2]">Neurology Patient</span>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-[18px] p-[35px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-2.5">
          <div className="text-[#FFD700] text-2xl mb-5">★★★★★</div>

          <p className="text-[#555] leading-[1.8] mb-[25px]">
            "Excellent doctors, modern infrastructure and friendly staff. Truly
            one of the best hospitals."
          </p>

          <h3 className="text-[#16324F] text-xl font-semibold">
            Aman Gupta
          </h3>

          <span className="text-[#0097b2]">Orthopedic Patient</span>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;