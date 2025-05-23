import React from 'react';
import logo from '../../assets/logo.png'; // Replace with your actual logo path

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-white to-blue-100 flex items-center justify-center relative px-4 py-6 sm:px-6 lg:px-8">
      
      {/* Logo at top-left - responsive size */}
      <div className="absolute top-4 left-4">
        <img src={logo} alt="Logo" className="h-10 sm:h-12 w-auto" />
      </div>

      {/* Content wrapper - responsive padding and width */}
      <div className="bg-white shadow-2xl rounded-2xl p-4 sm:p-6 md:p-8 w-full max-w-md sm:max-w-lg lg:max-w-xl border border-blue-100">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
