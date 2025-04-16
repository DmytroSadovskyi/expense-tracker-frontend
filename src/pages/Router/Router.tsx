import { Route, Routes, Navigate } from 'react-router';
import { PrivateRoute } from '../../components/PrivateRoute.tsx';
import { RestrictedRoute } from '../../components/RestrictedRoute.tsx';
import { Home } from '../Home.tsx';
import { Dashboard } from '../Dashboard.tsx';
import { Login } from '../Login.tsx';
import { Register } from '../Register.tsx';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/register"
        element={
          <RestrictedRoute redirectTo="/dashboard" component={<Register />} />
        }
      />
      <Route
        path="/login"
        element={
          <RestrictedRoute redirectTo="/dashboard" component={<Login />} />
        }
      />
      <Route
        path="/dashboard"
        element={<PrivateRoute redirectTo="/login" component={<Dashboard />} />}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
