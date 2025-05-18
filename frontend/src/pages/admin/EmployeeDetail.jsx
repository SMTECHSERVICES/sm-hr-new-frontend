import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function EmployeeDetail() {
  const { id } = useParams();
  // Fetch employee detail, attendance, etc. by ID (not implemented here)

  useEffect(()=>{
    const getUserDetail = async()=>{
         try {
              const token = localStorage.getItem('token');
               const { data } = await axios.get(`http://localhost:5000/api/admin/employees/${id}`, {
          headers: { Authorization: token },
        });
        console.log(data)
         } catch (error) {
            console.log(error)
         }
    }

    getUserDetail();
  },[])

  return (
    <div className="ml-64 min-h-screen p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Employee Detail - ID: {id}</h2>
      <p>Mark attendance and generate salary slip here...</p>
    </div>
  );
}

export default EmployeeDetail;
