// import SingleCourse from "../../pages/course/[slug]";
import { currencyFormatter } from "../../utils/helpers";
import {Badge, Modal, Button} from 'antd'
import ReactPlayer from 'react-player'
import { LoadingOutlined, SafetyOutlined } from "@ant-design/icons";


const SingleCourseJumotron = ({course, showModal, setShowModal, preview, user, setPreview, handlePaidEnrollment, handleFreeEnrollment, loading, enrolled, setEnrolled}) => {

    const {
        name, 
        description, 
        instructor, 
        updatedAt, 
        lessons, 
        image, 
        price, 
        paid, 
        category,
      } = course;

return(
    <div className="jumbotron square">
        <div className="row p-3" style={{marginRight:'0'}}>
          <div className="col-md-8" style={{paddingTop: '50px', paddingLeft:'100px'}}>
           <h1 style={{color:'whitesmoke'}} className="text-light font-weight-bold">{name}</h1>
           <p style={{color:'whitesmoke'}} className="lead">{description &&  description.substring(0,160)}...</p>
            <Badge count={category} style={{backgroundColor:'#03a9f4'}} className="pb-4 mr-2"/>
            <p style={{color:'whitesmoke'}}>Created by {instructor.name}</p>
            <p style={{color:'whitesmoke'}}>Last Updated {new Date(updatedAt).toLocaleString()}</p>
            <h4 className="text-light">
             {paid
             ?currencyFormatter({
               amount: price, 
               currency: "usd",
             })
           :"Free"
            }
            </h4>
          </div>
          <div className="col-md-4">
            {/* {JSON.stringify(lessons[0])} */}
            {lessons[0].video && lessons[0].video.Location ? 
            <div onClick={()=> {
              setPreview(lessons[0].video.Location)
              setShowModal(!showModal)
            }}>
              <ReactPlayer 
              className="react-player-div" 
              url={lessons[0].video.Location}
              width="100%"
              height="225px"
              />
            </div> : (
              <>
              <img src={image.Location} alt={name} className="img img-fluid"/>
              </>
            )}
            {loading ? (
              <div className="d-flex justify-content-center">
                <LoadingOutlined className="h1 text-danger"/>
              </div>
            ) : (
              <div className="d-flex justify-content-center">
                <Button
                className="mb-3 mt-3 enroll"
                type="danger"
                shape="round"
                icon={<SafetyOutlined/>}
                size="larger"
                disabled={loading}
                onClick={paid ? handlePaidEnrollment : handleFreeEnrollment}
                >
                  {user 
                  ? enrolled.status 
                    ? "Go to Course"
                    : "Enroll"
                  : "Login to Enroll"}
                  </Button>
                  </div>
            )}
            
          </div>
        
      </div>
    </div>
)
}

export default SingleCourseJumotron