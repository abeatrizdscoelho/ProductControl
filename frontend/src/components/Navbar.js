import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-blue">
      <div className="container d-flex justify-content-center">
        <Link className="navbar-brand logo-text" to="/home">Nuel Tech</Link>
      </div>
    </nav>
  );
};