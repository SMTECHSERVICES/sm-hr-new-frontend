import { useEffect,useState } from 'react';
import axios from 'axios';

const LeaveHistory = () => {
    const [leaveHistory, setLeaveHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaveHistory = async () => {
          try {
            const token = localStorage.getItem('token');
            const headers = { Authorization: `${token}` };
    
            
            const leaveRes = await axios.get('http://localhost:5000/api/leaves/all', { headers });
            //const leaveRes = await axios.get('http://localhost:5000/api/leave/me', { headers });
            console.log(leaveRes)
    
            
            setLeaveHistory(leaveRes?.data?.leavesReport);
            //setLeaves(leaveRes.data);
          } catch (err) {
            console.error(err);
          } finally {
            setLoading(false);
          }
        };
    
        fetchLeaveHistory();
      }, []);

      if(loading) return <div>Loading....</div>

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Daily Attendance</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="p-2">From</th>
               <th className="p-2">To</th>
              <th className="p-2">Status</th>
              <th className="p-2">Reason</th>
            </tr>
          </thead>
          <tbody>
            {leaveHistory.map((entry, idx) => (
              <tr key={idx} className="border-b">
                <td className="p-2">{new Date(entry.fromDate).toLocaleDateString()}</td>
                <td className="p-2">{new Date(entry.toDate).toLocaleDateString()}</td>
                <td className="p-2">{entry.status}</td>
                 <td className="p-2">{entry.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default LeaveHistory

