const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  date: Date,
  status: { type: String, enum: ['Present', 'Absent', 'Leave'] },
});

module.exports = mongoose.model('Attendance', attendanceSchema);
