import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/shared/AuthLayout';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      console.log('success');
      localStorage.setItem('token', data.token);
      navigate('/empdashboard');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
   <AuthLayout>
     <div className=" flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition"
          onClick={handleLogin}
        >
          Login
        </button>

        {/* Register Link */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <a
            href="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Register here
          </a>

        </p>
         <p className="mt-4 text-center text-sm text-gray-600">
          
          <a
            href="/admin"
            className="text-blue-600 hover:underline font-medium"
          >
            Login as Admin
          </a>
        </p>
      </div>
    </div>
   </AuthLayout>
  );
}

export default Login;
