import { useEffect, useState } from 'react';
import axios from 'axios';

function Attendance() {
  const [file, setFile] = useState(null);
  const [records, setRecords] = useState([]);
  const token = localStorage.getItem('token');

  const fetchData = async () => {
    const { data } = await axios.get('http://localhost:5000/api/attendance', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setRecords(data);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    await axios.post('http://localhost:5000/api/attendance/upload', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Attendance Management</h2>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} className="mb-2" />
      <button className="bg-green-600 text-white p-2 rounded" onClick={handleUpload}>
        Upload Attendance CSV
      </button>

      <table className="w-full mt-6 bg-white border">
        <thead>
          <tr>
            <th className="border p-2">Employee</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r._id}>
              <td className="border p-2">{r.employee?.name}</td>
              <td className="border p-2">{new Date(r.date).toLocaleDateString()}</td>
              <td className="border p-2">{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Attendance;
