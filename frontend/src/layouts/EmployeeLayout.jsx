import React from 'react'
import Sidebar from '../components/Sidebar'

const EmployeeLayout = ({children}) => {
  return (
   <div className="flex">
      <Sidebar />
      <div className="ml-64 flex-1 min-h-screen bg-gray-100 p-6">
        {children}
      </div>
    </div>
  )
}

export default EmployeeLayout
