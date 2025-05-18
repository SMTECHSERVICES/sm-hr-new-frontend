import React from 'react';
import { useNavigate } from 'react-router-dom';

function ActionCard({ title, buttonLabel, path, bgColor }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <button
        onClick={() => navigate(path)}
        className={`text-white px-4 py-2 rounded hover:opacity-90 ${bgColor}`}
      >
        {buttonLabel}
      </button>
    </div>
  );
}

export default ActionCard;