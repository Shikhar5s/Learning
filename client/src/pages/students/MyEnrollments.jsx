import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'

const MyEnrollments = () => {
 const{enrolledCourses}=useContext(AppContext)


  return (
    <div className='md:px-36 px-8 pt-10'>
    <div>My Enrollments</div>
    <table>
      <thead>
        <tr>
          <th className="px-4 py-3 font-semibold-truncate">Course</th>
          <th className="px-4 py-3 font-semibold-truncate">Duration</th>
          <th className="px-4 py-3 font-semibold-truncate">Completed</th>
          <th className="px-4 py-3 font-semibold-truncate">Status</th>
        </tr>
      </thead>
      <tbody>
        {enrolledCourses.map((course,index)=>(
          <tr key={index}>
            <td>
              <img src={course.courseThumbnail} alt="" className='w-14 sm:w-24 md:w-28' />
            <div>
              <p>{course.courseTitle}</p>
            </div>
          
            </td>

            
          
          </tr>
        ))}
      </tbody>
    </table>

    </div>
  )
}

export default MyEnrollments