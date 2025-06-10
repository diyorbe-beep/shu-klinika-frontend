import { Navigate, Outlet, useLocation } from 'react-router-dom';

function ProtectedRoute() {
  const token = localStorage.getItem('token');
  const location = useLocation();
  
  if (!token) {
    // Foydalanuvchi qaysi sahifada bo'lganligini saqlab qo'yamiz
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;