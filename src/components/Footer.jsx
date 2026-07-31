import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#0B1F33] text-white pt-[70px] mt-[100px]" id="contact">
      <div className="w-[90%] max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.3fr] gap-[50px]">
        {/* About */}
        <div>
          <h2 className="text-[#19b5d1] text-[2rem] font-bold mb-5">
            MediFlow
          </h2>

          <p className="text-[#d5dce5] leading-[1.9] mb-[30px]">
            Delivering compassionate, patient-centered healthcare through
            experienced specialists, advanced technology, and world-class
            medical services.
          </p>

          <div className="flex gap-4 mt-[30px] justify-center md:justify-start">
            {[
              "fa-facebook-f",
              "fa-twitter",
              "fa-instagram",
              "fa-linkedin-in",
            ].map((icon, index) => (
              <a
                key={index}
                href="#"
                className="w-[50px] h-[50px] flex items-center justify-center rounded-full bg-white/10 border border-white/15 text-white text-[20px] backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:bg-[#0097b2] hover:border-[#0097b2] hover:shadow-[0_10px_25px_rgba(0,151,178,0.45)]"
              >
                <i
                  className={`fa-brands ${icon} transition-transform duration-300 hover:scale-110`}
                ></i>
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-semibold mb-5">Quick Links</h3>

          {["Home", "About", "Services", "Doctors", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[#d5dce5] mb-[15px] transition duration-300 hover:text-[#19b5d1] hover:translate-x-[6px]"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Departments */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-semibold mb-5">Departments</h3>

          {[
            "Cardiology",
            "Neurology",
            "Orthopedics",
            "Diagnostics",
            "Emergency Care",
          ].map((dept) => (
            <a
              key={dept}
              href="#"
              className="text-[#d5dce5] mb-[15px] transition duration-300 hover:text-[#19b5d1] hover:translate-x-[6px]"
            >
              {dept}
            </a>
          ))}
        </div>

        {/* Contact */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-semibold mb-5">Contact Us</h3>

          <p className="text-[#d5dce5] mb-[15px]">
            📍 Nagpur, Maharashtra
          </p>

          <a
            href="tel:+919665761444"
            className="text-[#d5dce5] mb-[15px] transition duration-300 hover:text-[#19b5d1] hover:translate-x-[6px]"
          >
            📞 +91 96657 61444
          </a>

          <a
            href="mailto:support@mediflow.com"
            className="text-[#d5dce5] mb-[15px] transition duration-300 hover:text-[#19b5d1] hover:translate-x-[6px]"
          >
            ✉️ support@mediflow.com
          </a>

          <p className="text-[#d5dce5]">
            🚑 Emergency Available 24×7
          </p>
        </div>
      </div>

      <hr className="w-[90%] max-w-[1400px] mx-auto my-[60px] mb-[30px] border-0 h-[1px] bg-[#27435e]" />

      <div className="w-[90%] max-w-[1400px] mx-auto pb-[30px] flex flex-col md:flex-row justify-between items-center gap-5">
        <p className="text-[#d5dce5] text-center md:text-left">
          © {new Date().getFullYear()} MediFlow Hospital. All Rights Reserved.
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-5 sm:gap-[30px]">
          <a
            href="#"
            className="text-[#d5dce5] transition duration-300 hover:text-[#19b5d1]"
          >
            Privacy Policy
          </a>

          <a
            href="#"
            className="text-[#d5dce5] transition duration-300 hover:text-[#19b5d1]"
          >
            Terms & Conditions
          </a>

          <a
            href="#"
            className="text-[#d5dce5] transition duration-300 hover:text-[#19b5d1]"
          >
            Sitemap
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;