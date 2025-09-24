import React from 'react'
import { assets, dummyTestimonial } from '../../assets/assets';

const TestimonialSection = () => {


  return (
    <section className="bg-gray-50 py-14 px-6 md:px-0 max-w-7xl mx-auto text-center">
      <h2 className="text-3xl font-medium text-gray-800 mb-3">Testimonials</h2>
      <p className="text-gray-500 max-w-3xl mx-auto mb-10 text-base md:text-lg leading-relaxed">
        Hear from the learners as they share their journeys of transformation,
        success, and how our platform has made a difference in their lives.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {dummyTestimonial.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center max-w-md mx-auto md:mx-0"
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-20 h-20 rounded-full object-cover mb-4"
              loading="lazy"
            />
            <h3 className="text-lg font-semibold text-gray-900">
              {testimonial.name}
            </h3>
            <p className="text-sm text-gray-500 mb-3">{testimonial.role}</p>

            <div className="flex justify-center mb-4 space-x-1">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={i < Math.floor(testimonial.rating) ?  assets.star : assets.star_blank}
                  alt={i < Math.floor(testimonial.rating) ? "star filled" : "star empty"}
                  className="h-5 w-5"
                  loading="lazy"
                />
              ))}
            </div>

            <p className="text-gray-600">{testimonial.feedback}</p>
          </div>
        ))}
      </div>
    </section>
  );
};



export default TestimonialSection