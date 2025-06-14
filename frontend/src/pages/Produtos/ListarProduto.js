import '../style.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useToast } from '../../contexts/ToastContext';

export default function ListarProduto() {
    const { showToast } = useToast();
    const [products, setProducts] = useState([]);

    //'async' - Marca a função como assíncrona.
    //'await' - Espera o resultado do 'fetch' e depois do 'res.json()', para não usar '.then'.
    const CarregarProdutos = async () => {
        try {
            const res = await fetch('http://localhost:3000/products');
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error('Erro ao conectar com o servidor.', error);
            showToast('Erro ao carregar a lista de produtos.', 'error');
        }
    };

    useEffect(() => {
        CarregarProdutos();
    }, []);

    //DeletarProduto
    async function DeletarProduto(id) {
        try {
            const res = await fetch(`http://localhost:3000/products/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                showToast('Produto excluído com sucesso!', 'success');
                setProducts(products.filter(product => product.id !== id)); //Remove o produto da lista sem precisar recarregar tudo.
            } else {
                showToast('Erro ao excluir produto.', 'error');
            }
        } catch (error) {
            console.error('Erro ao conectar com o servidor.', error);
            showToast('Erro ao conectar com o servidor.', 'error');
        }
    };

    return (
        <div className="container">
            <h2>Produtos</h2>
            <p>Produtos cadastrados na Nuel Tech...</p>
            <div>
                <table className="table">
                    <thead className="table-light">
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Quantidade</th>
                            <th>Preço</th>
                            <th>Categoria</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{product.stock}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>
                                    <Link to={`/products/update/${product.id}`} style={{ textDecoration: 'none' }}>
                                        <button type='button' className='btn btn-success d-flex align-items-center'>
                                            <img src="https://img.icons8.com/?size=18&id=86023&format=png&color=FFFFFF" alt="Editar" style={{ marginRight: '7px' }}/>
                                            Editar
                                        </button>
                                    </Link>
                                </td>
                                <td>
                                    <a onClick={() => DeletarProduto(product.id)} style={{ textDecoration: 'none' }}>
                                        <button type='button' className='btn btn-danger d-flex align-items-center'>
                                            <img src="https://img.icons8.com/?size=18&id=nS7wslGWJu0R&format=png&color=FFFFFF" alt="Excluir" style={{ marginRight: '7px' }} />
                                            Excluir
                                        </button>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='text-center mt-4'>
                    <Link to="/products/create" className='btn btn-blue text-white'>Cadastrar Produto</Link>
                </div>
            </div>
        </div>
    );
};