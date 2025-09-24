import React from "react";
import { ArrowRight } from "lucide-react"; // clean arrow icon

const CallToAction = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <h1 className="text-3xl md:text-5xl font-bold mb-6">
          Learn Anything, Anytime, Anywhere
        </h1>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-gray-200 mb-10">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
          maxime molestias inventore dicta quidem nobis a tempora totam hic
          accusantium commodi nisi ut? Dolor?
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-2xl shadow-md hover:bg-gray-100 transition">
            Get Started
          </button>
          <button className="flex items-center justify-center bg-transparent border border-white text-white font-semibold px-6 py-3 rounded-2xl hover:bg-white hover:text-blue-600 transition">
            Learn More <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
