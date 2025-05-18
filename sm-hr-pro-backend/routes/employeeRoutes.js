const express = require('express');
const Employee = require('../models/Employee');
const { protect } = require('../middleware/authMiddleware.js');
const roleMiddleware = require('../middleware/roleMiddleware.js');
const Attendance = require('../models/Attendance.js')

const router = express.Router();

router.use(protect)

// GET all employees
router.get('/me', async (req, res) => {
  console.log(req.employee)
  try {
    const employee = await Employee.findById(req.employee.id).select('-password');
   return res.json(employee);
  } catch (error) {
    return res.status(500).json({message:'internal server error'});
  }
});

router.get('/attendance/me', async (req, res) => {
  console.log(req.employee,"it is from attendance")
try {
    const employee = await Employee.findById(req.employee.id).select('-password');
  const attendance = await Attendance.findOne({ employee: req.employee.id });
  console.log(attendance)
   return  res.json({
      attendanceReport: attendance ? attendance.attendanceReport : []
    });
} catch (error) {
  return res.status(500).json({message:'internal server error'});
}
});



// POST new employee
// router.post('/',protect,  async (req, res) => {
//   const {name,email,salary,role,department} = req.body;
//   const employee = new Employee({
//     name,
//     email,
//     salary,
//     role,
//     department
//   });
//   const newEmp = await employee.save();
//   res.status(201).json(newEmp);
// });

// router.get('/adminAccess', protect, roleMiddleware('admin'), async (req, res) => {
//   const employees = await Employee.find();
//   res.json(employees);
// });
module.exports = router;
