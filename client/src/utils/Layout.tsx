import { Outlet } from 'react-router-dom';
// Components
import Footer from '../components/Footer/Footer';
import Sidebar from '../components/Sidebar/Sidebar';

const Layout: React.FC = () => {
  return (
    <>
      <Sidebar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
