import '../style.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { validarCamposNumericos } from '../../utils/Validation';
import { toast } from 'react-toastify';

export default function UpdateProduct() {
    const { id } = useParams(); //Extrai parâmetros (id) da URL.
    const navigate = useNavigate(); //Navega entre rotas.
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [stock, setStock] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [errorPrice, setErrorPrice] = useState(false);
    const [errorStock, setErrorStock] = useState(false);

    useEffect(() => {
        async function CarregarProduto() {
            try {
                const res = await fetch(`http://localhost:3000/products/${id}`);
                const data = await res.json();
                setName(data.name);
                setDescription(data.description);
                setStock(data.stock);
                setPrice(data.price);
                setCategory(data.category);
            } catch (error) {
                console.error('Erro ao conectar com o servidor.', error);
                toast.error('Erro ao carregar os dados do produto.');
            }
        };
        CarregarProduto();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = validarCamposNumericos({ price, stock, setErrorPrice, setErrorStock });
        if (!isValid) return;
        
        const updateProduct = { id: Number(id), name, description, stock: Number(stock), price: parseFloat(price).toFixed(2), category };

        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:3000/products/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(updateProduct)
            });
            if (res.ok) {
                toast.success('Produto editado com sucesso!');
                setTimeout(() => {
                    navigate('/products');
                }, 1500);
            } else {
                toast.error('Erro ao editar produto.');
            };
        } catch (error) {
            console.error('Erro ao conectar com o servidor.', error);
            toast.error('Erro ao conectar com o servidor.');
        };
    };

    return (
        <div className="container">
            <h2 className='mb-4 text-center'>Editar Produto</h2>
            <p className='text-center text-muted mb-4'>
                Atualize as informações do produto abaixo.
            </p>
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
                            <label className="form-label">Preço (R$)</label>
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
                        <button type="submit" className="btn btn-blue text-white mt-2">Salvar Alterações</button>
                    </div>
                </form>
            </div>
        </div>
    );
};