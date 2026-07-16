import React from 'react'
import doctor1 from "../assets/dr-revanur-vishwanath.png"
const Doctors = () => {
  return (
    <div>
      <section className="doctors">

    <div className="section-heading">
        <span>OUR DOCTORS</span>
        <h2>Meet Our Medical Experts</h2>
        <p>
            Highly qualified specialists committed to providing
            exceptional patient care.
        </p>
    </div>

    <div className="doctor-grid">

        <div className="doctor-card">

            <img src={doctor1} alt="" />

            <h3>Dr. Sarah Johnson</h3>

            <p>Cardiologist</p>

            <span>15+ Years Experience</span>


        </div>
        <div className="doctor-card">

            <img src={doctor1} alt="" />

            <h3>Dr. Sarah Johnson</h3>

            <p>Cardiologist</p>

            <span>15+ Years Experience</span>


        </div>
        <div className="doctor-card">

            <img src={doctor1} alt="" />

            <h3>Dr. Sarah Johnson</h3>

            <p>Cardiologist</p>

            <span>15+ Years Experience</span>


        </div>

    </div>

</section>
    </div>
  )
}

export default Doctors
