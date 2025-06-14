import { Routes, Route } from 'react-router-dom';
import { ToastProvider } from './contexts/ToastContext';

import Navbar from './components/Navbar';
import Inicio from './pages/Inicio';
import EditarProduto from './pages/Produtos/EditarProduto';
import ListagemProduto from './pages/Produtos/ListarProduto';
import CadastrarProduto from './pages/Produtos/CadastrarProduto';

export default function App() {
  return (
    <ToastProvider>
      <div>
        <Navbar />
        <div className='container mt-4'>
          <Routes>
            <Route path='/' element={<Inicio />} />
            <Route path='/products' element={<ListagemProduto />} />
            <Route path='/products/create' element={<CadastrarProduto />} />
            <Route path='/products/update/:id' element={<EditarProduto />} />
          </Routes>
        </div>
      </div>
    </ToastProvider>
  );
};