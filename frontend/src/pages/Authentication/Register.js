import '../style.css';
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = async (e) => {
            e.preventDefault();
    
            const newUser = { name, email, password };
    
            try {
                const res = await fetch('http://localhost:3000/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newUser)
                });
                if (res.ok) {
                    toast.success('Usuário cadastrado com sucesso!');
                    setTimeout(() => {
                        navigate('/');
                    }, 1500);
                } else {
                    toast.error('Erro ao cadastrar usuário.');
                }
            } catch (error) {
                console.error('Erro ao conectar com o servidor.', error);
                toast.error('Erro ao conectar com o servidor.');
            };
        };

    return (
        <div className="container text-center mt-5">
            <h1 className="mb-4">Bem-vindo(a) ao Sistema Nuel Tech</h1>
            <p className="mb-5">
                Registre-se para gerenciar seus produtos de forma simples e prática.
            </p>
            <div className='d-flex justify-content-center align-items-center'>
                <div className='card shadow border p-5' style={{ maxWidth: '400px' }}>
                    <h4 className='mb-4 fw-semibold'>Cadastro</h4>
                    <form className='d-flex row' onSubmit={handleSubmit}>
                        <input type="text" placeholder="Nome" className="form-control mb-3" value={name} onChange={(e) => setName(e.target.value)} required />
                        <input type="email" placeholder="E-mail" className="form-control mb-3" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <input type="password" placeholder="Senha" className="form-control mb-3" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <button type="submit" className="btn btn-blue text-white mb-3">Cadastrar-se</button>
                    </form>
                    <Link to='/' className='text-decoration-none small'>Já tem uma conta? Faça login</Link>
                </div>
            </div>
        </div>
    );
};