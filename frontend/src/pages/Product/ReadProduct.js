import '../style.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

export default function ReadProduct() {
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
            toast.error('Erro ao carregar a lista de produtos.');
        }
    };

    useEffect(() => {
        CarregarProdutos();
    }, []);

    //Função para deletar produto.
    async function DeleteProduct(id) {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:3000/products/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                toast.success('Produto excluído com sucesso!');
                setProducts(products.filter(product => product.id !== id)); //Remove o produto da lista sem precisar recarregar tudo.
            } else {
                toast.error('Erro ao excluir produto.');
            };
        } catch (error) {
            console.error('Erro ao conectar com o servidor.', error);
            toast.error('Erro ao conectar com o servidor.');
        };
    };

    return (
        <div className="container">
            <h2 className='mb-4 text-center'>Produtos</h2>
            <p className='text-center text-muted mb-4'>
                Abaixo estão listados todos os produtos cadastrados no sistema, você pode editar ou excluir conforme necessário.
            </p>
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
                                            <img src="https://img.icons8.com/?size=17&id=86023&format=png&color=FFFFFF" alt="Editar" style={{ marginRight: '7px' }} />
                                            Editar
                                        </button>
                                    </Link>
                                </td>
                                <td>
                                    <button type='button' className='btn btn-danger d-flex align-items-center' onClick={() => DeleteProduct(product.id)} style={{ textDecoration: 'none' }}>
                                        <img src="https://img.icons8.com/?size=17&id=nS7wslGWJu0R&format=png&color=FFFFFF" alt="Excluir" style={{ marginRight: '7px' }} />
                                        Excluir
                                    </button>
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