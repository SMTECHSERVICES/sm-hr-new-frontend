import { useEffect, useState } from 'react';
import axios from 'axios';

function MyPayslips() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/payrolls/mine', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setData(res.data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Payslips</h2>
      <table className="w-full bg-white border">
        <thead>
          <tr>
            <th className="border p-2">Month</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Payslip</th>
          </tr>
        </thead>
        <tbody>
          {data.map((p) => (
            <tr key={p._id}>
              <td className="border p-2">{p.month}</td>
              <td className="border p-2">₹{p.totalSalary}</td>
              <td className="border p-2">
                <a
                  href={`http://localhost:5000/api/payrolls/${p._id}/payslip`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyPayslips;
