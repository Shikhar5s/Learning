import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";

const Companies = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Array of logos from assets (assuming all are valid image paths)
  const logos = [
    { src: assets.adobe_logo, alt: "Adobe" },
    { src: assets.accenture_logo, alt: "Accenture" },
    { src: assets.paypal_logo, alt: "PayPal" },
    { src: assets.walmart_logo, alt: "Walmart" },
    { src: assets.microsoft_logo, alt: "Microsoft" },
  ];

  return (
    <section
      className={`pt-16 bg-gray-900 text-center transition-opacity duration-700 ease-in-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-label="Trusted by learners companies"
    >
      <p className="text-base text-gray-400 tracking-wide uppercase mb-6">
        Trusted By Learners
      </p>

      {/* Scrolling container */}
      <div
        className="overflow-hidden"
        aria-label="Companies logos carousel"
      >
        <div
          className="flex whitespace-nowrap animate-scroll-slow gap-10 items-center justify-center"
          style={{ minWidth: "max-content" }}
        >
          {/* First set */}
          {logos.map(({ src, alt }, idx) => (
            <div
              key={`logo1-${idx}`}
              className="inline-flex items-center justify-center min-w-[120px] min-h-[60px]"
            >
              <img
                src={src}
                alt={alt}
                className="max-h-14 object-contain grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition duration-300"
                loading="lazy"
              />
            </div>
          ))}

          {/* Duplicate set for seamless scroll */}
          {logos.map(({ src, alt }, idx) => (
            <div
              key={`logo2-${idx}`}
              className="inline-flex items-center justify-center min-w-[120px] min-h-[60px]"
            >
              <img
                src={src}
                alt={alt}
                className="max-h-14 object-contain grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollSlow {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll-slow {
          animation: scrollSlow 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Companies;