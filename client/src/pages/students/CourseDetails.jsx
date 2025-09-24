import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/students/Loading';

const StarIcon = ({ filled }) => (
  <svg
    className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.164c.969 0 1.371 1.24.588 1.81l-3.37 2.447a1 1 0 00-.364 1.118l1.287 3.957c.3.92-.755 1.688-1.54 1.118l-3.37-2.447a1 1 0 00-1.176 0l-3.37 2.447c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.04 9.384c-.783-.57-.38-1.81.588-1.81h4.164a1 1 0 00.95-.69l1.286-3.957z" />
  </svg>
);

const CourseDetails = () => {
  const { id } = useParams();
  const { allCourses } = useContext(AppContext);

  const [courseData, setCourseData] = useState(null);
  const[isAlreadyEnrolled,setIsAlreadyEnrolled]=useState(false)
  useEffect(() => {
    if (!allCourses) return;
    const found = allCourses.find((c) => c._id === id);
    setCourseData(found || null);
  }, [allCourses, id]);

  if (!allCourses) return <Loading />;
  if (!courseData)
    return (
      <div className="max-w-4xl mx-auto p-8">
        <p className="text-center text-gray-500 text-lg">Course not found or loading...</p>
      </div>
    );

  // Ratings
  const ratingCount = Array.isArray(courseData.courseRatings) ? courseData.courseRatings.length : 0;
  const avgRating = ratingCount
    ? (courseData.courseRatings.reduce((s, r) => s + (r.rating || 0), 0) / ratingCount).toFixed(1)
    : null;

  // Students (unique)
  const enrolledCount = Array.isArray(courseData.enrolledStudents)
    ? new Set(courseData.enrolledStudents).size
    : 0;

  // Price & discount
  const price = typeof courseData.coursePrice === 'number' ? courseData.coursePrice : Number(courseData.coursePrice) || 0;
  const discount = typeof courseData.discount === 'number' ? courseData.discount : Number(courseData.discount) || 0;
  const discountedPrice = discount ? (price * (100 - discount) / 100).toFixed(2) : price.toFixed(2);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
      {/* Main Content */}
      <div className="md:col-span-2 space-y-10">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">{courseData.courseTitle}</h1>

        <div className="flex flex-wrap items-center gap-6 text-gray-600">
          <div className="flex items-center gap-2">
            {avgRating ? (
              <>
                <span className="flex items-center space-x-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon key={star} filled={star <= Math.round(avgRating)} />
                  ))}
                </span>
                <span className="ml-2 font-semibold text-yellow-600 text-xl">{avgRating}</span>
                <span className="ml-1 text-base text-gray-500">({ratingCount} ratings)</span>
              </>
            ) : (
              <span className="italic text-gray-400">No ratings yet</span>
            )}
          </div>

          <div className="text-base">
            <span className="font-semibold">{enrolledCount}</span> student{enrolledCount !== 1 ? 's' : ''}
          </div>

          <span
            className={`px-4 py-1 rounded-full text-sm font-semibold uppercase tracking-wide ${
              courseData.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}
            title={courseData.isPublished ? 'Published' : 'Draft'}
          >
            {courseData.isPublished ? 'Published' : 'Draft'}
          </span>
        </div>

        {/* Enhanced course description */}
        <section
          className="prose prose-lg max-w-none text-gray-800 bg-gray-50 p-8 rounded-3xl shadow-inner border border-gray-200"
          dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}
        />

        <section className="space-y-8">
          <h2 className="text-4xl font-semibold border-b-2 border-gray-300 pb-4">Course Content</h2>

          {Array.isArray(courseData.courseContent) && courseData.courseContent.length ? (
            <div className="space-y-6">
              {courseData.courseContent
                .slice()
                .sort((a, b) => (a.chapterOrder || 0) - (b.chapterOrder || 0))
                .map((chapter) => (
                  <div
                    key={chapter.chapterId}
                    className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {chapter.chapterOrder}. {chapter.chapterTitle}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      {(chapter.chapterContent || []).length} lecture{(chapter.chapterContent || []).length !== 1 ? 's' : ''}
                    </p>

                    <ul className="space-y-4">
                      {(chapter.chapterContent || [])
                        .slice()
                        .sort((a, b) => (a.lectureOrder || 0) - (b.lectureOrder || 0))
                        .map((lec) => (
                          <li
                            key={lec.lectureId}
                            className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border-l-4 border-blue-500 pl-4"
                          >
                            <div>
                              <h4 className="font-semibold text-lg text-gray-900">
                                {lec.lectureOrder}. {lec.lectureTitle}
                              </h4>
                              <p className="text-xs sm:text-sm text-gray-600">Duration: {lec.lectureDuration} min</p>
                            </div>

                            <div className="flex items-center gap-4 mt-2 sm:mt-0">
                              {lec.isPreviewFree && (
                                <span className="text-xs px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-semibold select-none">
                                  Preview
                                </span>
                              )}
                              {lec.lectureUrl && (
                                <a
                                  href={lec.lectureUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-sm font-semibold text-blue-600 hover:underline"
                                >
                                  Watch
                                </a>
                              )}
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No content added yet.</p>
          )}
        </section>

        <footer className="text-sm text-gray-500 space-y-1 mt-10">
          <div>
            <strong>Created:</strong>{' '}
            {courseData.createdAt ? new Date(courseData.createdAt).toLocaleDateString() : '—'}
          </div>
          <div>
            <strong>Last updated:</strong>{' '}
            {courseData.updatedAt ? new Date(courseData.updatedAt).toLocaleDateString() : '—'}
          </div>
        </footer>
      </div>

      {/* Sidebar */}
    <aside className="bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center sticky top-20 h-fit space-y-10 max-w-sm mx-auto md:mx-0">
  {courseData.courseThumbnail ? (
    <img
      src={courseData.courseThumbnail}
      alt={courseData.courseTitle}
      className="w-full h-56 object-cover rounded-3xl shadow-lg mb-6"
    />
  ) : (
    <div className="w-full h-56 bg-gray-100 rounded-3xl flex items-center justify-center text-gray-400 mb-6 text-lg font-semibold">
      No Image
    </div>
  )}

  <div className="w-full text-center">
    {discount ? (
      <div className="flex justify-center items-baseline gap-4 mb-8">
        <span className="text-4xl font-extrabold text-gray-900">₹{discountedPrice}</span>
        <span className="text-lg line-through text-gray-400">₹{price.toFixed(2)}</span>
        <span className="px-4 py-1 bg-red-200 text-red-800 rounded-full font-semibold text-sm select-none">
          {discount}% off
        </span>
      </div>
    ) : (
      <div className="text-4xl font-extrabold text-gray-900 mb-10">₹{price.toFixed(2)}</div>
    )}

    <button
      type="button"
      disabled={isAlreadyEnrolled}
      className={`w-full py-4 rounded-2xl text-white font-bold transition focus-visible:ring-4 focus-visible:ring-blue-300 ${
        isAlreadyEnrolled
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-700'
      }`}
    >
      {isAlreadyEnrolled ? 'Already Enrolled' : 'Enroll Now'}
    </button>

    <div className="pt-8 text-left">
      <p className="text-xl font-semibold text-gray-800 mb-4">What's in the course</p>
      <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm md:text-base">
        <li>Lifetime access with free updates</li>
        <li>Step-by-step, hands-on project guidance</li>
        <li>Downloadable resources and source code</li>
        <li>Certificate of completion</li>
      </ul>
    </div>
  </div>
</aside>
    </div>
  );
};

export default CourseDetails;