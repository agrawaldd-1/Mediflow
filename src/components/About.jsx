import React from 'react'

const About = () => {
    return (
        <>
            <section className="about">
                <div className="about-left">
                    <span>ABOUT US</span>

                    <h2>
                        Excellence in Healthcare,
                        <br />
                        Compassion in Every Treatment.
                    </h2>

                    <p>
                        MediFlow Hospital is a modern multi-speciality healthcare
                        institution dedicated to providing comprehensive,
                        patient-centered medical services through clinical excellence,
                        innovation, and compassion.
                    </p>

                    <p>
                        Our hospital combines experienced doctors with advanced
                        diagnostic facilities to ensure every patient receives the
                        highest standard of care.
                    </p>

                    <p>
                        From preventive healthcare to emergency treatment and advanced
                        surgeries, MediFlow delivers reliable healthcare with a
                        patient-first approach.
                    </p>
                </div>

                <div className="about-right">
                    <div className="card">
                        <h3>20+</h3>
                        <p>Departments</p>
                    </div>

                    <div className="card">
                        <h3>150+</h3>
                        <p>Doctors</p>
                    </div>

                    <div className="card">
                        <h3>50K+</h3>
                        <p>Patients Treated</p>
                    </div>

                    <div className="card">
                        <h3>24×7</h3>
                        <p>Emergency Care</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default About
