import React, { createContext, useState, useEffect } from "react";
import { dummyCourses } from "../assets/assets";
import {useNavigate} from 'react-router-dom'



export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

  const currency = import.meta.env.VITE_CURRENCY || "$";
   const [enrolledCourses,setEnrolledCourses]=useState([])
  const [allCourses, setAllCourses] = useState([]);
const[isEducator,setIsEducator]=useState(true);
   
  const navigate=useNavigate();

  const calculateRating=(course)=>{

    if(course.courseRatings.length===0){

      return 0;
    }
    let totalRating=0;

    course.courseRatings.forEach(rating=>{
      totalRating+=rating.rating
    })

    return totalRating/course.courseRatings.length



  }

  useEffect(() => {
    const fetchAllCourses = async () => {
     
      setAllCourses(dummyCourses);
    };

    fetchAllCourses();
  }, []);

  const fetchUserEnrolledCourses=async()=>{
   
    setEnrolledCourses(dummyCourses)


  }

  useEffect(()=>{
    fetchUserEnrolledCourses();
  },[])


  const value = {
    currency,
    allCourses,
    navigate,calculateRating,isEducator,
    setIsEducator,
    enrolledCourses,setEnrolledCourses,fetchUserEnrolledCourses
   
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};