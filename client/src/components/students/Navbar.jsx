import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { AppContext } from "../../context/AppContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isCourseListPage = location.pathname.includes("/course-list");

  const { openSignIn } = useClerk();
  const { user } = useUser();
  const { isEducator } = useContext(AppContext);

  return (
    <nav
      className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${
        isCourseListPage ? "bg-white" : "bg-cyan-100/70"
      }`}
      role="navigation"
      aria-label="Main Navigation"
    >
      {/* Logo */}
      <img
        src={assets.logo}
        alt="Logo"
        className="w-28 lg:w-32 cursor-pointer"
        onClick={() => navigate("/")}
      />

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6 text-gray-500">
        {user && (
          <div className="flex items-center gap-5">
            <button
              onClick={() => navigate("/educator")}
              className="hover:text-cyan-700 transition"
              aria-label={
                isEducator
                  ? "Go to Educator Dashboard"
                  : "Become an Educator"
              }
            >
              {isEducator ? "Educator Dashboard" : "Become Educator"}
            </button>
            <Link
              to="/my-enrollments"
              className="hover:text-cyan-700 transition"
            >
              My Enrollments
            </Link>
          </div>
        )}

        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={openSignIn}
            className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition"
            aria-label="Create Account"
          >
            Create Account
          </button>
        )}
      </div>

      {/* Mobile / Small Screen Menu */}
      <div className="flex md:hidden items-center gap-4 text-gray-500">
        {user && (
          <div className="flex flex-col items-end gap-2 text-right text-sm max-sm:text-xs">
            <button
              onClick={() => navigate("/educator")}
              className="hover:text-cyan-700 transition"
              aria-label={
                isEducator
                  ? "Go to Educator Dashboard"
                  : "Become an Educator"
              }
            >
              {isEducator ? "Educator Dashboard" : "Become Educator"}
            </button>
            <Link
              to="/my-enrollments"
              className="hover:text-cyan-700 transition"
            >
              My Enrollments
            </Link>
          </div>
        )}

        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={openSignIn}
            aria-label="Sign In"
            className="p-1 rounded-full hover:bg-gray-200 transition"
          >
            <img src={assets.user_icon} alt="User icon" className="w-6 h-6" />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;