function Dashboard() {
    return (
      <div className="p-4">
        <div className="flex ">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-green-100 p-4 rounded shadow">Total Employees: 10</div>
          <div className="bg-blue-100 p-4 rounded shadow">Total Payrolls: ₹50000</div>
          <div className="bg-yellow-100 p-4 rounded shadow">Attendance Today: 8</div>
        </div>
      </div>
    );
  }
  
  export default Dashboard;
  