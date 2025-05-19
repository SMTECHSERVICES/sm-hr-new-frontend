import React from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useState,useEffect } from "react";
import axios from 'axios'

const LeaveRequests = () => {
    const [leaveRequests,setLeaveRequests] = useState([]);
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/admin/leave/${id}`);
  };

   useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('http://localhost:5000/api/admin/leave/all', {
          headers: { Authorization: token },
        });
        console.log(data)
        setLeaveRequests(data);
      } catch (error) {
        console.error('Failed to fetch employees', error);
      }
    };
    fetchLeaveRequests();
  }, []);

  return (
    <div className="overflow-x-auto mt-6">
      <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">Pending Leave Requests</h2>
      <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Employee Name</th>
            <th className="py-3 px-4 text-left">Department</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Leave Type</th>
            <th className="py-3 px-4 text-left">From</th>
            <th className="py-3 px-4 text-left">To</th>
            <th className="py-3 px-4 text-left">Reason</th>
            <th className="py-3 px-4 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests?.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center p-4 text-gray-500">
                No pending leave requests.
              </td>
            </tr>
          ) : (
            leaveRequests.map((leave) => (
              <tr
                key={leave._id}
                className="hover:bg-gray-100 cursor-pointer transition-all"
                onClick={() => handleRowClick(leave._id)}
              >
                <td className="py-3 px-4">{leave.employee.name}</td>
                <td className="py-3 px-4 capitalize">{leave.employee.department}</td>
                <td className="py-3 px-4">{leave.employee.email}</td>
                <td className="py-3 px-4">{leave.leaveType}</td>
                <td className="py-3 px-4">{moment(leave.fromDate).format("DD MMM YYYY")}</td>
                <td className="py-3 px-4">{moment(leave.toDate).format("DD MMM YYYY")}</td>
                <td className="py-3 px-4">{leave.reason}</td>
                <td className="py-3 px-4">
                  <span className="inline-block px-2 py-1 text-sm bg-yellow-100 text-yellow-800 rounded">
                    {leave.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveRequests;
