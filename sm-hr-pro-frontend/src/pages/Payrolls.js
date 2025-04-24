import { useEffect, useState } from 'react';
import axios from 'axios';

function Payrolls() {
  const [payrolls, setPayrolls] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employeeId: '',
    month: '',
    basic: '',
    hra: '',
    deductions: ''
  });

  const token = localStorage.getItem('token');

  const fetchEmployees = async () => {
    const { data } = await axios.get('http://localhost:5000/api/employees', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setEmployees(data);
  };

  const fetchPayrolls = async () => {
    const { data } = await axios.get('http://localhost:5000/api/payrolls', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setPayrolls(data);
  };

  const handleSubmit = async () => {
    await axios.post('http://localhost:5000/api/payrolls', form, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchPayrolls();
  };

  useEffect(() => {
    fetchEmployees();
    fetchPayrolls();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Payroll Management</h2>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <select
          className="border p-2 rounded"
          onChange={(e) => setForm({ ...form, employeeId: e.target.value })}
        >
          <option>Select Employee</option>
          {employees.map(emp => (
            <option key={emp._id} value={emp._id}>{emp.name}</option>
          ))}
        </select>
        <input type="text" placeholder="Month" className="border p-2 rounded" onChange={(e) => setForm({ ...form, month: e.target.value })} />
        <input type="number" placeholder="Basic" className="border p-2 rounded" onChange={(e) => setForm({ ...form, basic: Number(e.target.value) })} />
        <input type="number" placeholder="HRA" className="border p-2 rounded" onChange={(e) => setForm({ ...form, hra: Number(e.target.value) })} />
        <input type="number" placeholder="Deductions" className="border p-2 rounded" onChange={(e) => setForm({ ...form, deductions: Number(e.target.value) })} />
        <button className="bg-blue-500 text-white p-2 rounded" onClick={handleSubmit}>Generate Payroll</button>
      </div>

      <table className="w-full bg-white border">
        <thead>
          <tr>
            <th className="border p-2">Employee</th>
            <th className="border p-2">Month</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Payslip</th>
          </tr>
        </thead>
        <tbody>
          {payrolls.map((p) => (
            <tr key={p._id}>
              <td className="border p-2">{p.employee?.name}</td>
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
              <td className="border p-2">
                <a
                  href="http://localhost:5000/api/payrolls/export/csv"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded mb-4 inline-block"
                >
                  Export Payroll CSV
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Payrolls;
