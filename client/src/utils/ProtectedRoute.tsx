import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/store';
import Layout from './Layout';

const ProtectedRoute = () => {
  const userState = useAppSelector((state) => state.user.user);

  return userState ? <Layout /> : <Navigate to='/login' />;
};

export default ProtectedRoute;
