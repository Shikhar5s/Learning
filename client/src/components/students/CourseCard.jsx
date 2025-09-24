import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets"; // star icon
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  const { currency,calculateRating } = useContext(AppContext);

  if (!course) return null; // safety check

  // Price calculation with safe defaults
  const discountedPrice = (
    (course.coursePrice ?? 0) -
    ((course.discount ?? 0) * (course.coursePrice ?? 0)) / 100
  ).toFixed(2);

  const rating = course.rating ?? 4.5;
  const reviewCount = course.reviewCount ?? 22;

  return (
    <Link to={`/course/${course._id}`} className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden flex flex-col">
      <img
        src={course.courseThumbnail}
        alt={`Thumbnail of ${course.courseTitle}`}
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3
          className="text-lg font-semibold text-gray-900 mb-1 truncate"
          title={course.courseTitle}
        >
          {course.courseTitle}
        </h3>
        <p className="text-sm text-gray-600 mb-3">{course.educator?.name}</p>

        <div className="flex items-center space-x-2 mb-3">
          <p>{calculateRating(course)}</p>
          <p className="text-yellow-500 font-semibold">{rating}</p>
          <div className="flex space-x-0.5">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={i<Math.floor (calculateRating(course))?assets.star : assets.star_blank}
                alt="star icon"
                className={`w-4 h-4 ${
                  i < Math.round(rating)
                    ? "filter brightness-100"
                    : "filter grayscale brightness-50"
                }`}
                loading="lazy"
              />
            ))}
          </div>
          <p className="text-sm text-gray-500">({reviewCount})</p>
        </div>

        <p className="text-xl font-bold text-gray-900 mt-auto">
          {currency}
          {discountedPrice}
        </p>
      </div>
    </Link>
  );
};

export default CourseCard;
