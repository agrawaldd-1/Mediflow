import React from "react";
import doctor1 from "../assets/dr-revanur-vishwanath.png";
import doctor2 from "../assets/dr-subhashini-prabhakar.jpg";
import doctor3 from "../assets/dr-abhishek-pande-669522c37f44b.avif";
const Doctors = () => {
  return (
    <section className="w-[90%] mx-auto my-24">
      {/* Section Heading */}
      <div className="text-center mb-16">
        <span className="text-[#0097b2] tracking-[2px] font-bold">
          OUR DOCTORS
        </span>

        <h2 className="text-[2.7rem] text-[#16324F] font-bold my-[15px]">
          Meet Our Medical Experts
        </h2>

        <p className="w-full md:w-[60%] mx-auto text-[#666] leading-[1.8]">
          Highly qualified specialists committed to providing exceptional
          patient care.
        </p>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[30px]">
        {/* Doctor Card 1 */}
        <div className="bg-white rounded-[18px] overflow-hidden text-center shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-2.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.12)]">
          <img
            src={doctor1}
            alt="Dr. Revanur Vishwanath"
            className="w-full h-72 object-cover"
          />

          <div className="p-6">
            <h3 className="text-xl font-semibold text-[#16324F] mb-2">
              Dr. Sarah Johnson
            </h3>

            <p className="text-[#0097b2] font-medium mb-2">Cardiologist</p>

            <span className="text-[#666] text-sm">
              15+ Years Experience
            </span>
          </div>
        </div>

        {/* Doctor Card 2 */}
        <div className="bg-white rounded-[18px] overflow-hidden text-center shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-2.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.12)]">
          <img
            src={doctor2}
            alt="Dr. Subhashini Prabhakar"
            className="w-full h-72 object-cover"
          />

          <div className="p-6">
            <h3 className="text-xl font-semibold text-[#16324F] mb-2">
              Dr. Subhashini Prabhakar
            </h3>

            <p className="text-[#0097b2] font-medium mb-2">Neurologist</p>

            <span className="text-[#666] text-sm">
              46+ Years Experience
            </span>
          </div>
        </div>

        {/* Doctor Card 3 */}
        <div className="bg-white rounded-[18px] overflow-hidden text-center shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-2.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.12)]">
          <img
            src={doctor3}
            alt="Dr. Abhishek Pande"
            className="w-full h-72 object-cover"
          />

          <div className="p-6">
            <h3 className="text-xl font-semibold text-[#16324F] mb-2">
              Dr. Abhishek Pande
            </h3>

            <p className="text-[#0097b2] font-medium mb-2">General Physician</p>

            <span className="text-[#666] text-sm">
              17 Years Experience
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Doctors;