import {useState, useEffect} from 'react'
import axios from 'axios'
import CourseCard from '../components/Cards/CourseCard'
import Image from 'next/image'
import headerPic from '../public/images/drone-header.png'
import Footer from '../components/footer/Footer'

const Index = ({courses}) => {
  // const [courses, setCourses] = useState([])

  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     const {data} = await axios.get('/api/courses')
  //     console.log("COURSES", data)
  //     setCourses(data)
  //   }
  //   fetchCourses();
  //   console.log('Courses', courses)
  // }, [])


return(
  <div>
      <Image src={headerPic} alt="drone driver header image"/>
       <h1 className="jumbotron text-center square flux" style={{margin:"20px 0"}}>
      The Courses
      </h1>
      <div className="container-fluid" >
      <div className="row">
      {courses && courses.map((course) => (
        <div className="col-md-3">
      <CourseCard key={course.id} course={course}/>
      </div>
  ))}
      </div>
    </div>
    <h1 className="jumbotron text-center square flux">
      What you'll learn!
      </h1>
      <div style={{display:'flex', justifyContent:'space-around'}}>
        <div>
          <ul style={{color:'white', fontSize:'1.25rem'}}>
            <li>FAA Part 107 Regulations</li>
            <li>How to apply for airspace authorizations</li>
            <li>All other test topics included in the FAA P107 exam</li>
            <li>How to fly small unmanned aircraft legally & safely throughout the NAS</li>
          </ul>
        </div>
        <div>
          <ul style={{color:'white', fontSize:'1.25rem'}}>
            <li>How the National Airspace System (NAS) works</li>
            <li>Weather</li>
            <li>How to pass the FAA Part 107 Remote Pilot Exam quickly!</li>
          </ul>
        </div>
      </div>
      <div>

      </div>
      <div style={{display:'flex', justifyContent:'center'}}>
        <p style={{color:'white', width:'80%', fontSize:'1.2rem'}}>

        Knock out your studying for the FAA Part 107 exam with four hours of useful and relevant content brought to you by a Certified Flight Instructor who has real world manned aviation, BVLOS and Part 107 experience. This course was designed to minimize fluff material and maximize focus on the important things you really need to learn not only to pass your exam, but to also help you understand how to safely and legally operate small unmanned aircraft in the real world as well.
        <br></br>
        This course has been updated to reflect the final Part 107 rules that were released in 2021. These regulatory changes relate to Remote ID, night flying, re-currency test changes and operating a small unmanned aircraft over people.
        <br></br>
        This course contains lot of quizzes and downloadable resource material in order to help prepare you for your Part 107 Knowledge Test (UAG) and for your own reference when operating small unmanned aircraft real world operations.
        <br></br>
        It also contains some bonus material that help you apply knowledge to real world scenarios like requesting airspace authorizations from Air Traffic Control using AIRMAP.
        <br></br>
        Additionally, there is a 60 question practice test at the end of the course that will give you idea of what to expect during the real thing.
        <br></br>
        </p>
      </div>
      <Footer/>
  </div>
)


  }

  export async function getServerSideProps(){
    const {data} = await axios.get(`${process.env.API}/courses`)
    return {
      props:{
        courses: data
      }
    }
  }

export default Index;