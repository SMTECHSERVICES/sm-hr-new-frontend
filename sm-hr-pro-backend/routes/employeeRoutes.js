const express = require('express');
const Employee = require('../models/Employee');
const { protect } = require('../middleware/authMiddleware.js');
const roleMiddleware = require('../middleware/roleMiddleware.js');
const router = express.Router();

// GET all employees
router.get('/', protect, async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

// POST new employee
router.post('/',protect,  async (req, res) => {
  const {name,email,salary,role,department} = req.body;
  const employee = new Employee({
    name,
    email,
    salary,
    role,
    department
  });
  const newEmp = await employee.save();
  res.status(201).json(newEmp);
});

router.get('/adminAccess', protect, roleMiddleware('admin'), async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});
module.exports = router;
