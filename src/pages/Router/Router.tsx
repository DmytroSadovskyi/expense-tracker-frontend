import { Route, Routes } from 'react-router';
import { Home } from '../Home.tsx';
import { Dashboard } from '../Dashboard.tsx';
import { Login } from '../Login.tsx';
import { Register } from '../Register.tsx';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};
