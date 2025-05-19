import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MarkAttendancePage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleMarkAttendance = async (status) => {
    setIsSubmitting(true);
    const token = localStorage.getItem("token");

    try {
      const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"

      await axios.post(
        "http://localhost:5000/api/employee/mark-attendance",
        {
          status,
          date: today,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      // Redirect to dashboard after successful mark
      navigate("/empdashboard");
    } catch (error) {
      console.error("Failed to mark attendance:", error);
      alert("Attendance already marked");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-700">Mark Your Attendance</h1>
        <p className="mb-6 text-gray-600">Choose your attendance status for today</p>

        <div className="flex justify-around">
          <button
            disabled={isSubmitting}
            onClick={() => handleMarkAttendance("Present")}
            className={`px-6 py-2 rounded text-white font-semibold ${
              isSubmitting ? "bg-green-300" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            Present
          </button>

          <button
            disabled={isSubmitting}
            onClick={() => handleMarkAttendance("Absent")}
            className={`px-6 py-2 rounded text-white font-semibold ${
              isSubmitting ? "bg-red-300" : "bg-red-600 hover:bg-red-700"
            }`}
          >
            Absent
          </button>
        </div>

        {isSubmitting && <p className="mt-4 text-sm text-gray-500">Submitting attendance...</p>}
      </div>
    </div>
  );
};

export default MarkAttendancePage;
