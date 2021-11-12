import React, { useState, useEffect, createElement } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import StudentRoute from "../../../components/routes/StudentRoute";
import { Button, Menu, Avatar, Progress } from "antd";
import ReactPlayer from "react-player";
import ReactMarkdown from "react-markdown";

import {
  PlayCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CheckCircleFilled,
  MinusCircleFilled
} from "@ant-design/icons";


const { Item } = Menu;

const SingleCourse = () => {
  const [clicked, setClicked] = useState(-1);
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState({ lessons: [] });
  const [completedLessons, setCompletedLessons] = useState([]);
  const [progress, setProgress] = useState()
  //state to force state update
  const [updateState, setUpdatateState] = useState(false);

  // router
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) loadCourse();
  }, [slug]);

  useEffect(() => {
    if(course) loadCompletedLessons()
  },[course])

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/user/course/${slug}`);
    setCourse(data);
  };

  const loadCompletedLessons = async () => {
  const {data} = await axios.post(`/api/list-completed`, {courseId: course._id});
  console.log("Completed Lessons =>", data)
  setCompletedLessons(data)
};


  const markCompleted = async () => {
    const { data } = await axios.post(`/api/mark-completed`, {
      courseId: course._id,
      lessonId: course.lessons[clicked]._id,
    });
    console.log(data);
    setCompletedLessons([...completedLessons, course.lessons[clicked]._id ])
    updateProgress()
   
  };

  const markIncomplete = async () => {
    try{
      const {data} = await axios.post(`/api/mark-incomplete`, {
        courseId: course._id,
        lessonId: course.lessons[clicked]._id,
      })
      console.log(data);
      const all = completedLessons;
      const index = all.indexOf(course.lessons[clicked]._id)
      if(index > -1) {
        all.splice(index, 1)
        setUpdatateState(true)
        setCompletedLessons(all);
        updateProgress();
      }
    }catch(err){
      console.log(err)
    }
  }

  const updateProgress = () => {
    //take completed lessons divided by total lessons * 100
    const complete = completedLessons.length
    const all = course.lessons.length
    const percentage = complete / all * 100
    setProgress(percentage)
    console.log("COMPLETED", percentage)
  }

  

  return (
    <StudentRoute>
   

      <div style={{display:'flex'}}>
        <div style={{ width:'20%' }}>
          <Button
            onClick={() => setCollapsed(!collapsed)}
            className="text-primary mt-1 btn-block mb-2"
          >
            {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}{" "}
            {!collapsed && "Lessons"}
          </Button>
          <Menu
            defaultSelectedKeys={[clicked]}
            inlineCollapsed={collapsed}
            style={{ height: "80vh", overflow: "hidden", color:'white', background:'#333', border:'none' }}
          >
            {course.lessons.map((lesson, index) => (
              <Item
                onClick={() => setClicked(index)}
                key={index}
                icon={<Avatar style={{background:"#0D6EFD"}}>{index + 1}</Avatar>}
              >
                {lesson.title.substring(0, 30)} {completedLessons.includes(lesson._id) ? 
                <CheckCircleFilled className="float-right text-primary ml-2" style={{marginTop:"13px"}}/>
                 : 
                <MinusCircleFilled className="float-right text-danger ml-2" style={{marginTop:"13px"}} />}
              </Item>
            ))}
          </Menu>
        </div>

        <div className="col">
          {clicked !== -1 ? (
            <>
              <div className="col square" style={{background:'#001529', padding:'25px', display:'flex'}}>
               <div style={{display:'flex', flexDirection:'column'}}>
                <b style={{color:'white'}}>{course.lessons[clicked].title.substring(0, 30)}</b>
               {completedLessons.includes(course.lessons[clicked]._id) ?  
               <span className="float-right pointer" style={{color:'white'}} onClick={markIncomplete}>
                  Mark as incompleted
                </span> : 
                 <span className="float-right pointer" style={{color:'white'}} onClick={markCompleted}>
                  Mark as completed
                </span>}
                </div>
                <Progress type="circle" style={{color:'white'}} percent={progress} width={60} className="ms-auto"/>
              </div>

              {course.lessons[clicked].video &&
                course.lessons[clicked].video.Location && (
                  <>
                    <div className="wrapper">
                      <ReactPlayer
                      style={{padding: '15px'}}
                        className="player"
                        url={course.lessons[clicked].video.Location}
                        width="100%"
                        height="70vh"
                        controls
                        onEnded={() => markCompleted()}
                      />
                    </div>
                  </>
                )}

              <ReactMarkdown
                source={course.lessons[clicked].content}
                className="single-post"
              />
            </>
          ) : (
            <div className="d-flex justify-content-center p-5">
              <div className="text-center p-5">
                <PlayCircleOutlined className="text-primary display-1 p-5" />
                <p className="lead" style={{color:'whitesmoke'}}>Click on the lessons to start learning</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </StudentRoute>
  );
};

export default SingleCourse;
