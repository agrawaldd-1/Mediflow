import React from 'react'

const Services = () => {
  return (
    <div>
      <section className="services">

    <div className="section-heading">
        <span>OUR SERVICES</span>
        <h2>Healthcare Services We Provide</h2>
        <p>
            Comprehensive healthcare solutions delivered by experienced
            specialists using advanced medical technology.
        </p>
    </div>

    <div className="services-grid">

        <div className="service-card">
            <div className="icon">🩺</div>
            <h3>General Consultation</h3>
            <p>
                Expert physicians providing diagnosis, treatment, and preventive healthcare.
            </p>
        </div>

        <div className="service-card">
            <div className="icon">❤️</div>
            <h3>Cardiology</h3>
            <p>
                Advanced heart care including ECG, angiography, and cardiac surgery.
            </p>
        </div>

        <div className="service-card">
            <div className="icon">🧠</div>
            <h3>Neurology</h3>
            <p>
                Comprehensive treatment for brain, spine, and nervous system disorders.
            </p>
        </div>

        <div className="service-card">
            <div className="icon">🦴</div>
            <h3>Orthopedics</h3>
            <p>
                Bone, joint, and sports injury treatment with advanced surgical care.
            </p>
        </div>

        <div className="service-card">
            <div className="icon">🧪</div>
            <h3>Diagnostics</h3>
            <p>
                Modern pathology laboratory with fast and accurate test reports.
            </p>
        </div>

        <div className="service-card">
            <div className="icon">🚑</div>
            <h3>Emergency Care</h3>
            <p>
                24×7 emergency services with ICU, trauma care, and ambulance support.
            </p>
        </div>

    </div>

</section>
    </div>
  )
}

export default Services
