import express from "express";
import formidable from "express-formidable";

const router = express.Router();

// middleware
import { requireSignin, isInstructor, isEnrolled } from "../middlewares";

// controllers
import {
  uploadImage,
  removeImage,
  create,
  read,
  uploadVideo,
  removeVideo,
  addLesson,
  update,
  removeLesson,
  updateLesson,
  publishCourse,
  unpublishCourse,
  courses,
  checkEnrollment,
  freeEnrollment,
  userCourses,
  markCompleted
} from "../controllers/course";

router.get('/courses', courses)

// image
router.post("/course/upload-image", uploadImage);
router.post("/course/remove-image", removeImage);
// course
router.post("/course", requireSignin, isInstructor, create);
router.put("/course/:slug", requireSignin, update);
router.get("/course/:slug", read);
router.post(
  "/course/video-upload/:instructorId",
  requireSignin,
  formidable(),
  uploadVideo
);

// publish course
router.put("/course/publish/:courseId", requireSignin, publishCourse);
// unpublish course
router.put("/course/unpublish/:courseId", requireSignin, unpublishCourse);

router.post("/course/video-remove/:instructorId", requireSignin, removeVideo);
// `/api/course/lesson/${slug}/${course.instructor._id}`,
router.post("/course/lesson/:slug/:instructorId", requireSignin, addLesson);
router.put("/course/:slug/:lessonId", requireSignin, removeLesson);
router.put("/course/lesson/:slug/:lessonId", requireSignin, updateLesson);

router.get('/check-enrollment/:courseId', requireSignin, checkEnrollment);
//Enrollment
router.post('/free-enrollment/:courseId', requireSignin, freeEnrollment);

router.get('/user-courses', requireSignin, userCourses );
router.get("/user/course/:slug", requireSignin, read, isEnrolled);

//mark as complete
router.post('/mark-completed', requireSignin, markCompleted);
module.exports = router;


