import React, { useState, useEffect } from "react";

const LeaveForm = ({ onSubmit, employees = [] }) => {
  const [formData, setFormData] = useState({
    employee: "",
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: "",
    status: "Pending",
  });

  const [errors, setErrors] = useState({});

  const leaveTypes = ["Sick", "Casual", "Earned", "Maternity", "Other"];
  const statusOptions = ["Pending", "Approved", "Rejected"];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.employee) newErrors.employee = "Employee is required";
    if (!formData.leaveType) newErrors.leaveType = "Leave type is required";
    if (!formData.fromDate) newErrors.fromDate = "From date is required";
    if (!formData.toDate) newErrors.toDate = "To date is required";
    if (!formData.reason) newErrors.reason = "Reason is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-2xl font-bold text-center">Leave Request Form</h2>

      {/* Employee Selection */}
      <div>
        <label className="block font-semibold mb-1">Employee</label>
        <select
          name="employee"
          value={formData.employee}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.name}
            </option>
          ))}
        </select>
        {errors.employee && <p className="text-red-500 text-sm">{errors.employee}</p>}
      </div>

      {/* Leave Type */}
      <div>
        <label className="block font-semibold mb-1">Leave Type</label>
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
        <label className="block font-semibold mb-1">From Date</label>
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
        <label className="block font-semibold mb-1">To Date</label>
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
        <label className="block font-semibold mb-1">Reason</label>
        <textarea
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows={3}
        />
        {errors.reason && <p className="text-red-500 text-sm">{errors.reason}</p>}
      </div>

      {/* Status (optional for admin use) */}
      <div>
        <label className="block font-semibold mb-1">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          {statusOptions.map((stat) => (
            <option key={stat} value={stat}>{stat}</option>
          ))}
        </select>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Submit Leave Request
        </button>
      </div>
    </form>
  );
};

export default LeaveForm;
