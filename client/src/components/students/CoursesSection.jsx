import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import CourseCard from "./CourseCard";

const CoursesSection = () => {
  const { allCourses } = useContext(AppContext);

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
        Learn from the best
      </h2>

      <p className="text-gray-600 max-w-3xl mx-auto mb-10 text-base md:text-lg leading-relaxed">
        Discover our top-rated courses across various categories from coding and
        design to business and wellness.
      </p>

      {/* Grid layout instead of flex for clean alignment */}
      <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {allCourses.slice(0, 4).map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>

      <Link
        to="/course-list"
        onClick={() => window.scrollTo(0, 0)}
        className="inline-block bg-yellow-400 hover:bg-yellow-500 transition text-gray-900 font-semibold px-8 py-3 rounded-md shadow-md shadow-yellow-400/30 mt-10"
        aria-label="Show all courses"
      >
        Show all Courses
      </Link>
    </section>
  );
};

export default CoursesSection;
