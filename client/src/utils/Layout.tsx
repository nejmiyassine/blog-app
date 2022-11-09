import { Outlet } from 'react-router-dom';
import HomeHeader from '../components/HomeHeader/HomeHeader';
// Components
import Sidebar from '../components/Sidebar/Sidebar';

const Layout: React.FC = () => {
  return (
    <>
      <Sidebar />
      <HomeHeader />
      <Outlet />
    </>
  );
};

export default Layout;
