import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Navbar from './components/Navbar';
import Home from './pages/Product/HomeProduct';
import Login from './pages/Authentication/Login';
import Register from './pages/Authentication/Register';
import ReadProduct from './pages/Product/ReadProduct';
import CreateProduct from './pages/Product/CreateProduct';
import UpdateProduct from './pages/Product/UpdateProduct';

export default function App() {
  return (
    <>
      <div>
        <Navbar />
        <div className='container mt-4'>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/home' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/products' element={<ReadProduct />} />
            <Route path='/products/create' element={<CreateProduct />} />
            <Route path='/products/update/:id' element={<UpdateProduct />} />
          </Routes>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
    </>
  );
};