import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminZone = ({ children }) => {
  const user = useSelector((state) => state.user);
  return user?.role === 'admin' ? children : <Navigate to='/home' />;
};

export default AdminZone;
