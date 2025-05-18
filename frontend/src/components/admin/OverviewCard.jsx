import React from 'react';

function OverviewCard({ title, value, color }) {
  return (
    <div className={`bg-white p-6 rounded-xl shadow border-l-4 ${color}`}> 
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-3xl mt-2">{value}</p>
    </div>
  );
}

export default OverviewCard;