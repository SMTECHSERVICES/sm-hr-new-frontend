const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Employee = require('../../models/Employee.js');
const Attendance = require('../../models/Attendance.js');
const {adminOnly} = require('../../middleware/adminMiddleware.js')


dotenv.config();

const router = express.Router();

router.use(adminOnly)

router.get('/all', async (req, res) => {
  const employees = await Employee.find().select("-password");
 return res.json(employees);
});

router.post('/attendance/:id', async (req, res) => {
  try {
    const empId = req.params.id;
    const { date, status } = req.body;

    // Validate input
    if (!date || !status) {
      return res.status(400).json({ message: 'Date and status are required.' });
    }

    const employee = await Employee.findById(empId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Check if attendance record already exists
    let attendance = await Attendance.findOne({ employee: empId });

    const newEntry = {
      date: new Date(date), // Ensure date format
      status: status
    };

    if (attendance) {
      // Check if attendance for this date already exists
      const index = attendance.attendanceReport.findIndex(
        (entry) => entry.date.toDateString() === new Date(date).toDateString()
      );

      if (index !== -1) {
        // Update existing date's status
        attendance.attendanceReport[index].status = status;
      } else {
        // Add new entry
        attendance.attendanceReport.push(newEntry);
      }

      await attendance.save();
    } else {
      // Create new attendance record
      attendance = new Attendance({
        employee: empId,
        attendanceReport: [newEntry]
      });

      await attendance.save();
    }

    res.status(200).json({ message: 'Attendance marked successfully', attendance });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/:id',async(req,res)=>{
 // console.log('hie')
  const id = req.params.id;
  //console.log(id)
  const employee = await Employee.findById(id).select("-password");

  if(!employee){
    return res.status(404).json({
      message:'Employee does not exist'
    })
  }

  const attendanceRecord = await Attendance.find({employee:id})
  console.log(employee)

  return res.status(200).json({
    employee,
    attendanceRecord
  })

})


module.exports = router;