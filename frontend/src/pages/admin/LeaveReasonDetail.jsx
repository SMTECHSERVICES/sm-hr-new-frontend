// import axios from 'axios';
// import React from 'react';
// import { useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// function LeaveReasonDetail() {
//   const { id } = useParams();
//   // Fetch employee detail, attendance, etc. by ID (not implemented here)

//   useEffect(()=>{
//     const getLeaveDetails = async()=>{
//          try {
//               const token = localStorage.getItem('token');
//                const { data } = await axios.get(`http://localhost:5000/api/admin/leave/reason/${id}`, {
//           headers: { Authorization: token },
//         });
//         console.log(data)
//          } catch (error) {
//             console.log(error)
//          }
//     }

//     getLeaveDetails();
//   },[])

//   return (
//     <div className="ml-64 min-h-screen p-6 bg-gray-100">
//       <h2 className="text-2xl font-bold mb-6">Employee Detail - ID: {id}</h2>
//       <p>Mark attendance and generate salary slip here...</p>
//     </div>
//   );
// }

// export default LeaveReasonDetail;


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const LeaveReasonDetail = () => {
  const { id } = useParams(); // leave ID from route
  const navigate = useNavigate();
  const [leave, setLeave] = useState(null);

  
    

  useEffect(()=>{
    const getLeaveDetails = async()=>{
         try {
              const token = localStorage.getItem('token');
               const { data } = await axios.get(`http://localhost:5000/api/admin/leave/reason/${id}`, {
          headers: { Authorization: token },
        });
        console.log(data)
         setLeave(data);
         } catch (error) {
            console.log(error)
         }
    }

    getLeaveDetails();
  },[])

  const updateStatus = async (status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/admin/leave/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      navigate("/admin/leave-requests");
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  if (!leave) return <div className="text-center mt-20 text-gray-600">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Leave Request Detail</h2>

      {/* Employee Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div><strong>Name:</strong> {leave.employee.name}</div>
        <div><strong>Email:</strong> {leave.employee.email}</div>
        <div><strong>Department:</strong> {leave.employee.department}</div>
        <div><strong>Role:</strong> {leave.employee.role}</div>
      </div>

      {/* Leave Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div><strong>Leave Type:</strong> {leave.leaveType}</div>
        <div><strong>Status:</strong> 
          <span className={`ml-2 inline-block px-2 py-1 text-sm rounded
            ${leave.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : ''}
            ${leave.status === 'Approved' ? 'bg-green-100 text-green-800' : ''}
            ${leave.status === 'Rejected' ? 'bg-red-100 text-red-800' : ''}
          `}>
            {leave.status}
          </span>
        </div>
        <div><strong>From Date:</strong> {moment(leave.fromDate).format("DD MMM YYYY")}</div>
        <div><strong>To Date:</strong> {moment(leave.toDate).format("DD MMM YYYY")}</div>
      </div>

      {/* Reason */}
      <div className="mb-6">
        <strong>Reason:</strong>
        <p className="bg-gray-100 p-3 rounded mt-1 text-gray-700">{leave.reason}</p>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-6 mt-6">
        <button
          onClick={() => updateStatus("Rejected")}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded"
        >
          Reject
        </button>
        <button
          onClick={() => updateStatus("Approved")}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default LeaveReasonDetail;
