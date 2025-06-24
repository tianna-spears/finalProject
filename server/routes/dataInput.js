const express = require('express')
const router = express.Router()
const { 
    createCourse, 
    createAssignment, 
    createMentorSession,
    getAllAssignments,
    getAllCourses
} = require('../controllers/dataInput')

router.post('/course', createCourse)
router.post('/assignment', createAssignment)
router.post('/mentor', createMentorSession)
router.get('/course', getAllCourses) 
router.get('/assignment', getAllAssignments) 

module.exports = router;

