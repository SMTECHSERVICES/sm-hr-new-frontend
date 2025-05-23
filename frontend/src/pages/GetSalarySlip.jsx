import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetSalarySlip = () => {
  const [payrolls, setPayrolls] = useState([]);

  useEffect(() => {
    const fetchPayrolls = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('http://localhost:5000/api/employee/payroll', {
          headers: { Authorization: token }
        });
        setPayrolls(data);
      } catch (err) {
        console.error('Error fetching payrolls:', err);
      }
    };

    fetchPayrolls();
  }, []);

  return (
    <div className="p-4 sm:p-6 md:p-8 min-h-screen bg-gray-100">
      <div className="bg-white rounded shadow p-4 sm:p-6 overflow-hidden">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center sm:text-left">
          Your Salary Slips
        </h2>

        <div className="w-full overflow-x-auto">
          <table className="min-w-[640px] sm:min-w-full border border-gray-300 divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-gray-700 whitespace-nowrap">Month</th>
                <th className="px-4 py-2 text-left font-medium text-gray-700 whitespace-nowrap">Net Salary</th>
                <th className="px-4 py-2 text-left font-medium text-gray-700 whitespace-nowrap">Generated Date</th>
                <th className="px-4 py-2 text-left font-medium text-gray-700 whitespace-nowrap">PDF</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {payrolls.map((item) => (
                <tr key={item._id}>
                  <td className="px-4 py-2 text-gray-800 whitespace-nowrap">
                    {new Date(item.month).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                  </td>
                  <td className="px-4 py-2 text-gray-800 whitespace-nowrap">₹{item.netSalary}</td>
                  <td className="px-4 py-2 text-gray-800 whitespace-nowrap">
                    {new Date(item.generatedDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {item.pdfUrl ? (
                      <a
                        href={item.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 text-sm"
                      >
                        Download
                      </a>
                    ) : (
                      <span className="text-red-500 text-sm">Not Available</span>
                    )}
                  </td>
                </tr>
              ))}
              {payrolls.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No salary slips found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GetSalarySlip;
