import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LeaveAdminPanel = () => {
  const [leaves, setLeaves] = useState([]);

  const fetchLeaves = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('/api/leaves/all', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setLeaves(res.data);
  };

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem('token');
    await axios.put(`/api/leaves/update/${id}`, { status }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchLeaves();
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Leave Requests</h2>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-200">
            <th>Employee</th><th>Type</th><th>From</th><th>To</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map(leave => (
            <tr key={leave._id} className="border-t">
              <td>{leave.employee.name}</td>
              <td>{leave.leaveType}</td>
              <td>{leave.fromDate?.slice(0,10)}</td>
              <td>{leave.toDate?.slice(0,10)}</td>
              <td>{leave.status}</td>
              <td>
                <button onClick={() => updateStatus(leave._id, 'Approved')} className="text-green-600 mr-2">Approve</button>
                <button onClick={() => updateStatus(leave._id, 'Rejected')} className="text-red-600">Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveAdminPanel;
