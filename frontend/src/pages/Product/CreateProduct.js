import '../style.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validarCamposNumericos } from '../../utils/Validation';
import { toast } from 'react-toastify';

export default function CreateProduct() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [stock, setStock] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [errorPrice, setErrorPrice] = useState(false);
    const [errorStock, setErrorStock] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newProduct = { name, description, stock: Number(stock), price: parseFloat(price).toFixed(2), category };

        try {
            const res = await fetch('http://localhost:3000/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProduct)
            });
            if (res.ok) {
                toast.success('Produto cadastrado com sucesso!');
                setTimeout(() => {
                    navigate('/products');
                }, 1500);
            } else {
                toast.error('Erro ao cadastrar produto.');
            }
        } catch (error) {
            console.error('Erro ao conectar com o servidor.', error);
            toast.error('Erro ao conectar com o servidor.');
        }

        const isValid = validarCamposNumericos({ price, stock, setErrorPrice, setErrorStock });
        if (!isValid) return;
    };

    return (
        <div className="container">
            <h2 className='mb-4 text-center'>Cadastro de Produtos</h2>
            <p className='text-center text-muted mb-4'>
                Preencha os dados para cadastrar um novo produto no sistema.
            </p>
            <div className="card shadow border p-4">
                <form onSubmit={handleSubmit}>
                    <div className="row mt-4 mb-3">
                        <div className="col-md-6">
                            <label className="form-label">Nome</label>
                            <input type="text" className="form-control" id="name" placeholder="Nome do produto" value={name} onChange={e => setName(e.target.value)} required />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Categoria</label>
                            <input type="text" className="form-control" id="category" placeholder="Categoria do produto" value={category} onChange={e => setCategory(e.target.value)} required />
                        </div>
                    </div>
                    <div className="row mt-4 mb-3">
                        <div className="col-md-6">
                            <label className="form-label">Preço (R$)</label>
                            <input type='text' className={`form-control ${errorPrice ? 'is-invalid' : ''}`} id='price' placeholder='Preço do produto' value={price} onChange={(e) => { setPrice(e.target.value); setErrorPrice(false) }} required />
                            {errorPrice && (<div className="invalid-feedback">Insira um valor numérico válido.</div>)}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Quantidade</label>
                            <input type='text' className={`form-control ${errorStock ? 'is-invalid' : ''}`} id='stock' placeholder='Quantidade' value={stock} onChange={(e) => { setStock(e.target.value); setErrorStock(false) }} required />
                            {errorStock && (<div className="invalid-feedback">Insira um valor numérico válido.</div>)}
                        </div>
                    </div>
                    <div className="mt-4 mb-3">
                        <label className="form-label">Descrição</label>
                        <input type="text" className="form-control" id="description" placeholder="Descrição do produto" value={description} onChange={e => setDescription(e.target.value)} required />
                    </div>
                    <div className='text-center'>
                        <button type="submit" className="btn btn-blue text-white mt-2">Cadastrar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};