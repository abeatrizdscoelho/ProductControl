import './style.css';
import { Link } from 'react-router-dom';

export default function Inicio() {
  return (
    <>
      <div className="container text-center mt-5">
        <h1 className="mb-4">Bem-vindo(a) ao Sistema Nuel Tech</h1>
        <p className="mb-5">
          Gerencie seus produtos de forma simples e prática.
        </p>
        <div className="row g-4 d-flex justify-content-center">
          {[{ title: 'Produtos', desc: 'Cadastre e gerencie os produtos.', col: 4, route: '/products' }].map((item, index) => (
            <div className={`col-md-${item.col}`} key={index}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.desc}</p>
                  <Link to={item.route} className="btn btn-blue text-white">Acessar</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};