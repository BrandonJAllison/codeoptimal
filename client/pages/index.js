import {useState, useEffect} from 'react'
import axios from 'axios'
import CourseCard from '../components/Cards/CourseCard'

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
    <h1 className="jumbotron text-center square flux">
      Drone Drivers
    </h1>
    <div className="container-fluid">
      <div className="row">
      {courses && courses.map((course) => (
        <div className="col-md-3">
      <CourseCard key={course.id} course={course}/>
      </div>
  ))}
      </div>
    </div>
 
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