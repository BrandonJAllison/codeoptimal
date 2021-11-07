import {useState, useEffect} from 'react';
import axios from 'axios'
import {useRouter} from 'next/router'

const SingleCourse = (course) => {
  const router = useRouter()
  // const {slug} = router.query
  // //destructure props
  // const {name, description, instructor, updatedAt, lessons, image, price, paid, category} = course;

return(
  <>

      <div className="jumbotron square flux ">
        <div className="row">
          <div className="col-md-8">
           <h1 className="text-secondary font-weight-bold">{course.name}</h1>
           {/* <p className="lead">{description && description.substring(0,160)}...</p> */}

          </div>
          <div className="col-md-4">
          
            <p>Show course Image</p>
            <p>Show Enroll Button</p>

          </div>
        
      </div>
    </div>

  </>
)

};

export async function getServerSideProps({query}){
  const {data} = await axios.get(`${process.env.API}/course/${query.slug}`)
  return{
    props:{
      course:data
    }
  }
}

export default SingleCourse
