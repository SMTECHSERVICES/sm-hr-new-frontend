
import { useEffect,useState } from 'react';
import axios from 'axios';

const PersonalAttendance = () => {
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployeeData = async () => {
          try {
            const token = localStorage.getItem('token');
            const headers = { Authorization: `${token}` };
    
            
            const attendanceRes = await axios.get('http://localhost:5000/api/employee/attendance/me', { headers });
            //const leaveRes = await axios.get('http://localhost:5000/api/leave/me', { headers });
    
            
            setAttendance(attendanceRes?.data.attendanceReport);
            //setLeaves(leaveRes.data);
          } catch (err) {
            console.error(err);
          } finally {
            setLoading(false);
          }
        };
    
        fetchEmployeeData();
      }, []);

      if(loading) return <div>Loading....</div>

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Daily Attendance</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="p-2">Date</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((entry, idx) => (
              <tr key={idx} className="border-b">
                <td className="p-2">{new Date(entry.date).toLocaleDateString()}</td>
                <td className="p-2">{entry.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default PersonalAttendance
