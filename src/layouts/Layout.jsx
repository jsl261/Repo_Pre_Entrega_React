import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-pink-50">
      <Header />
      <Nav />
      <main className="flex-grow p-6 max-w-6xl w-full mx-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
}