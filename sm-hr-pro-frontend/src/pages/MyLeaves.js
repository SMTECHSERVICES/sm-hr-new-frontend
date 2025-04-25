import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyLeaves = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/leaves/my', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLeaves(res.data);
    };
    fetchLeaves();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Leave Applications</h2>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-200">
            <th>Type</th><th>From</th><th>To</th><th>Status</th><th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map(leave => (
            <tr key={leave._id} className="border-t">
              <td>{leave.leaveType}</td>
              <td>{leave.fromDate?.slice(0,10)}</td>
              <td>{leave.toDate?.slice(0,10)}</td>
              <td className="font-semibold">{leave.status}</td>
              <td>{leave.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyLeaves;
