import React from 'react'
import Hero from '../../components/students/Hero'
import Companies from '../../components/students/Companies'
import CoursesSection from '../../components/students/CoursesSection'
import TestmonialsSection from '../../components/students/TestimonialSection'
import CallToAction from '../../components/students/CallToAction'
const Home = () => {
  return (
    <div>
        <Hero></Hero>
        <Companies></Companies>
      <CoursesSection></CoursesSection>
      <TestmonialsSection></TestmonialsSection>
      <CallToAction></CallToAction>
    </div>
  )
}

export default Home
