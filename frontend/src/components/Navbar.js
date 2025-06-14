import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-blue">
      <div className="container">
        <Link className="navbar-brand logo-text" to="/">Nuel Tech</Link>
        <button //Hamburguer Menu
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-white fs-5" to="/products">Listagem Produtos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white fs-5" to="/products/create">Cadastrar Produtos</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};