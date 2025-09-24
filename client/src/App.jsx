import React from 'react'
import Player from './pages/students/Player.jsx'
import MyCourses from './pages/educator/MyCourses.jsx'
import CoursesList from './pages/students/CoursesList.jsx'
import CourseDetails from './pages/students/CourseDetails.jsx'
import MyEnrollments from './pages/students/MyEnrollments.jsx'
import Loading from './pages/students/Loading.jsx'

import Dashboard from './pages/educator/Dashboard.jsx'
import AddCourse from './pages/educator/AddCourse.jsx'
import Navbar from './components/students/Navbar.jsx'
import StudentsEnrolled from './pages/educator/StudentsEnrolled.jsx'
import { Route, Routes, useMatch } from 'react-router-dom'
import Home from './pages/students/Home.jsx'
import Educator from './pages/educator/Educator.jsx'

const App = () => {

  const isEducatorRoute=useMatch('/educator/*')

  return (


    <div className='text-default min-h-screen bg-white'>
      {
        !isEducatorRoute && <Navbar/>
      }
    
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/course-list' element={<CoursesList/>}/>
      <Route path='/course-list/:input' element={<CoursesList/>}/>
      <Route path='/course/:id' element={<CourseDetails/>}/>
      <Route path='/my-enrollments' element={<MyEnrollments/>}/>
      <Route path='/player/:courseId' element={<Player/>}/>
      <Route path='/loading/:path' element={<Loading/>}/>

      <Route path='/educator' element={<Educator/>}>

      <Route path='educator' element={<Dashboard/>} />
       <Route path='add-course' element={<AddCourse/>} />
       <Route path='my-course' element={<MyCourses/>}/>

        <Route path='students-enrolled' element={<StudentsEnrolled/>} />
      </Route>
     </Routes>
      
      
    </div>
  )
}

export default App
