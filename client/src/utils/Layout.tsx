import { Outlet } from 'react-router-dom';
// Components
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';

const Layout: React.FC = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
