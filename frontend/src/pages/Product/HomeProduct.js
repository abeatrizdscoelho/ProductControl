import '../style.css';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <div className="container text-center mt-5">
        <h1 className="mb-4">Sistema Nuel Tech</h1>
        <p className="mb-5">
          Gerencie seus produtos de forma simples e prática.
        </p>
        <div className="row g-4 d-flex justify-content-center">
          {[{ title: 'Produtos', desc: 'Visualize e gerencie os produtos.', col: 4, route: '/products' },
            { title: 'Cadastro', desc: 'Cadastre novos produtos no sistema.', col: 4, route: '/products/create' }]
           .map((item, index) => (
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