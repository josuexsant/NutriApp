
<<<<<<< HEAD
import NavbarComponent from '../components/Navbar';
=======
import Navbar from '../components/Navbar';
>>>>>>> mi-repositorio/master
import Footer from '../components/Footer';

export const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
<<<<<<< HEAD
      <NavbarComponent />
=======
      <Navbar />
>>>>>>> mi-repositorio/master
      <main className="flex-grow mt-4">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;