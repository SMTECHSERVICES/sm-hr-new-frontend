import React, { useState } from 'react';
import axios from 'axios';

const LeaveApplyForm = () => {
  const [form, setForm] = useState({
    leaveType: 'Sick',
    fromDate: '',
    toDate: '',
    reason: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/leaves/apply', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Leave applied successfully!');
    } catch (err) {
      console.error(err);
      alert('Error applying leave');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Apply for Leave</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <select name="leaveType" value={form.leaveType} onChange={handleChange} className="w-full border p-2">
          <option value="Sick">Sick</option>
          <option value="Casual">Casual</option>
          <option value="Earned">Earned</option>
          <option value="Maternity">Maternity</option>
          <option value="Other">Other</option>
        </select>
        <input type="date" name="fromDate" value={form.fromDate} onChange={handleChange} className="w-full border p-2" required />
        <input type="date" name="toDate" value={form.toDate} onChange={handleChange} className="w-full border p-2" required />
        <textarea name="reason" placeholder="Reason..." value={form.reason} onChange={handleChange} className="w-full border p-2" required />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default LeaveApplyForm;
