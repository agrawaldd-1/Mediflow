import React from 'react'

const Testimonials = () => {
  return (
    <div>
      <section className="testimonials">

    <div className="section-heading">
        <span>TESTIMONIALS</span>

        <h2>What Our Patients Say</h2>

        <p>
            Thousands of patients trust MediFlow Hospital for quality healthcare and compassionate treatment.
        </p>
    </div>

    <div className="testimonial-grid">

        <div className="testimonial-card">

            <div className="stars">★★★★★</div>

            <p>
                "The doctors were highly professional and caring.
                My surgery was successful and the entire staff
                supported me throughout the recovery."
            </p>

            <h3>Rahul Sharma</h3>

            <span>Cardiology Patient</span>

        </div>

        <div className="testimonial-card">

            <div className="stars">★★★★★</div>

            <p>
                "Booking appointments was effortless and the hospital
                facilities are world-class. Highly recommended."
            </p>

            <h3>Priya Verma</h3>

            <span>Neurology Patient</span>

        </div>

        <div className="testimonial-card">

            <div className="stars">★★★★★</div>

            <p>
                "Excellent doctors, modern infrastructure and friendly
                staff. Truly one of the best hospitals."
            </p>

            <h3>Aman Gupta</h3>

            <span>Orthopedic Patient</span>

        </div>

    </div>

</section>
    </div>
  )
}

export default Testimonials
