import { useEffect, useState } from 'react';
import axios from 'axios';

function Employees() {
  const [employees, setEmployees] = useState([{name:'ram',email:'rk',role:'hr'}]);

  // const fetchEmployees = async () => {
  //   const token = localStorage.getItem('token');
  //   const { data } = await axios.get('http://localhost:5000/api/employees', {
  //     headers: { Authorization: `Bearer ${token}` },
  //   });
  //   setEmployees(data);
  // };

  // useEffect(() => {
  //   fetchEmployees();
  // }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Employees</h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td className="border px-4 py-2">{emp.name}</td>
              <td className="border px-4 py-2">{emp.email}</td>
              <td className="border px-4 py-2">{emp.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Employees;
