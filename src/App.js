import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard/Stats';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Asosiy yo'l - avtomatik ravishda login yoki dashboardga yo'naltiradi */}
      <Route path="/" element={
        localStorage.getItem('token') ? (
          <Navigate to="/dashboard" replace />
        ) : (
          <Navigate to="/login" replace />
        )
      } />
      
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          {/* Boshqa protected route'lar */}
        </Route>
      </Route>
      
      {/* Noto'g'ri yo'llar uchun */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;