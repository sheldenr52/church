import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
      <footer>
        <div className="footer-nav">
          <Navbar />
        </div>
        <div className="social-links">
          <a href="https://www.youtube.com/@queensburghsda283" target="_blank" rel="noopener noreferrer">YouTube</a>
          <a href="http://facebook.com/QSDAYouth" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://www.instagram.com/qsda_youth" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
        <p>&copy; {new Date().getFullYear()} QSDA Church. All rights reserved.</p>
      </footer>
    </>
  );
}
