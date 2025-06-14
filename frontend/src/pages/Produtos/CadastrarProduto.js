import '../style.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from '../../contexts/ToastContext';
import { validarCamposNumericos } from '../../utils/Validation';

export default function CadastrarProduto() {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [stock, setStock] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [errorPrice, setErrorPrice] = useState(false);
    const [errorStock, setErrorStock] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const NewProduct = { name, description, stock: Number(stock), price: parseFloat(price).toFixed(2), category };

        try {
            const res = await fetch('http://localhost:3000/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(NewProduct)
            });
            if (res.ok) {
                showToast('Produto cadastrado com sucesso!', 'success');
                setTimeout(() => {
                    navigate('/products');
                }, 1500);
            } else {
                showToast('Erro ao cadastrar produto.', 'error');
            }
        } catch (error) {
            console.error('Erro ao conectar com o servidor.', error);
            showToast('Erro ao conectar com o servidor.', 'error');
        }

        const isValid = validarCamposNumericos({price, stock, setErrorPrice, setErrorStock, showToast});
        if (!isValid) return;
    };

    return (
        <div className="container">
            <h2 className='mb-4 text-center'>Cadastro de Produtos</h2>
            <div className="card shadow border p-4">
                <form onSubmit={handleSubmit}>
                    <div className="row mt-4 mb-3">
                        <div className="col-md-6">
                            <label className="form-label">Nome</label>
                            <input type="text" className="form-control" id="name" placeholder="Digite o nome do produto" value={name} onChange={e => setName(e.target.value)} required />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Categoria</label>
                            <input type="text" className="form-control" id="category" placeholder="Digite a categoria do produto" value={category} onChange={e => setCategory(e.target.value)} required />
                        </div>
                    </div>
                    <div className="row mt-4 mb-3">
                        <div className="col-md-6">
                            <label className="form-label">Preço</label>
                            <input type='text' className={`form-control ${errorPrice ? 'is-invalid' : ''}`} id='price' placeholder='Digite o preço (R$)' value={price} onChange={(e) => { setPrice(e.target.value); setErrorPrice(false) }} required />
                            {errorPrice && (<div className="invalid-feedback">Insira um valor numérico válido.</div>)}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Quantidade</label>
                            <input type='text' className={`form-control ${errorStock ? 'is-invalid' : ''}`} id='stock' placeholder='Digite a quantidade' value={stock} onChange={(e) => { setStock(e.target.value); setErrorStock(false) }} required />
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