const express = require('express');
const Employee = require('../models/Employee');
const { protect } = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();

// GET all employees
router.get('/', protect, async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

// POST new employee
router.post('/', protect, async (req, res) => {
  const employee = new Employee(req.body);
  await employee.save();
  res.status(201).json(employee);
});

router.get('/', protect, roleMiddleware('admin'), async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});
module.exports = router;
