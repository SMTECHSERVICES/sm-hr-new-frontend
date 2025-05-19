import React, { useState } from "react";
import axios from 'axios';

const LeaveRequestForm = () => {
  const [formData, setFormData] = useState({
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: "",
  });

  const [errors, setErrors] = useState({});

  const leaveTypes = ["Sick", "Casual", "Earned", "Maternity", "Other"];

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

const validate = () => {
  const newErrors = {};
  const from = new Date(formData.fromDate);
  const to = new Date(formData.toDate);

  if (!formData.leaveType) newErrors.leaveType = "Leave type is required.";
  if (!formData.fromDate) newErrors.fromDate = "From date is required.";
  if (!formData.toDate) newErrors.toDate = "To date is required.";
  if (!formData.reason) newErrors.reason = "Reason is required.";

  if (formData.fromDate && formData.toDate && from > to) {
    newErrors.dateValidation = "From date cannot be larger than To date.";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
   try {
    const { data } = await axios.post(
      "http://localhost:5000/api/leaves/apply",
      formData, // body
      {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(data);
    alert("Leave request submitted successfully!");
    setFormData({ leaveType: "", fromDate: "", toDate: "", reason: "" }); // optional reset
  } catch (error) {
    console.error("Submission failed", error);
    alert("Failed to submit leave request");
  }

    
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-xl font-semibold text-center text-gray-700">Leave Request Form</h2>

      {/* Leave Type */}
      <div>
        <label className="block font-medium mb-1">Leave Type</label>
        <select
          name="leaveType"
          value={formData.leaveType}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Leave Type</option>
          {leaveTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        {errors.leaveType && <p className="text-red-500 text-sm">{errors.leaveType}</p>}
      </div>

      {/* From Date */}
      <div>
        <label className="block font-medium mb-1">From Date</label>
        <input
          type="date"
          name="fromDate"
          value={formData.fromDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {errors.fromDate && <p className="text-red-500 text-sm">{errors.fromDate}</p>}
      </div>

      {/* To Date */}
      <div>
        <label className="block font-medium mb-1">To Date</label>
        <input
          type="date"
          name="toDate"
          value={formData.toDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {errors.toDate && <p className="text-red-500 text-sm">{errors.toDate}</p>}
      </div>

      {/* Reason */}
      <div>
        <label className="block font-medium mb-1">Reason</label>
        <textarea
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows={3}
        />
        {errors.reason && <p className="text-red-500 text-sm">{errors.reason}</p>}
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
      {errors.dateValidation && alert(errors.dateValidation)}
    </form>
  );
};

export default LeaveRequestForm;
