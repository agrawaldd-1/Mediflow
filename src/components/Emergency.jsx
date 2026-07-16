import React from "react";

const Emergency = () => {
  return (
    <section className="emergency">
      <div className="emergency-content">

        <div className="emergency-left">
          <span className="badge">🚑 24×7 Emergency Support</span>

          <h2>Need Emergency Medical Care?</h2>

          <p>
            Our emergency department is available 24 hours a day,
            7 days a week with experienced doctors, ICU facilities,
            trauma care, and ambulance support.
          </p>
        </div>

        <div className="emergency-right">

          <div className="phone-box">
            <h4>Emergency Helpline</h4>

            <h2>+91 96657 61444</h2>
          </div>

          <button className="call-btn">
            📞 Call Now
          </button>

        </div>

      </div>
    </section>
  );
};

export default Emergency;