// src/pages/LoginPage.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const decoded = await login(email, password);
      const { typeUser } = decoded;

      if (typeUser === 'admin') navigate('/dashboard/admin');
      else if (typeUser === 'superadmin') navigate('/dashboard/superadmin');
      else navigate('/dashboard/user');
    } catch (err) {
      alert('Login failed');
    }
  };

  // return (
  //   <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
  //     <h2 className="text-xl mb-4">Login</h2>
  //     <input type="email" placeholder="Email" className="mb-2 p-2 w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
  //     <input type="password" placeholder="Password" className="mb-2 p-2 w-full" value={password} onChange={(e) => setPassword(e.target.value)} />
  //     <button className="bg-blue-600 text-white py-2 px-4 rounded" type="submit">Login</button>
  //   </form>
  // );
  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <h2 className="text-xl mb-4">Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="mb-2 p-2 w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="mb-2 p-2 w-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-blue-600 text-white py-2 px-4 rounded w-full mb-2" type="submit">
        Login
      </button>
      
      <div className="text-center">
        <Link to="/forgot-password" className="text-blue-500 hover:underline">
          Mot de passe oublié ?
        </Link>
      </div>
    </form>
  );
};

export default LoginPage;
