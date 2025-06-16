import '../style.css';
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = async (e) => {
            e.preventDefault();
    
            const user = { email, password };
    
            try {
                const res = await fetch('http://localhost:3000/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(user)
                });
                if (res.ok) {
                    const data = await res.json();
                    localStorage.setItem('token', data.token);
                    console.log('Token:', data.token);
                    toast.success('Usuário logado com sucesso!');
                    setTimeout(() => {
                        navigate('/home');
                    }, 1500);
                } else {
                    toast.error('Senha ou e-mail incorretos.');
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
                <div className='card border shadow p-5' style={{ maxWidth: '400px' }}>
                    <h4 className='mb-4 fw-semibold'>Login</h4>
                    <form className='d-flex row' onSubmit={handleSubmit}>
                        <input type="email" placeholder="E-mail" className="form-control mb-3" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <input type="password" placeholder="Senha" className="form-control mb-3" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <button type="submit" className="btn btn-blue text-white mb-3">Login</button>
                    </form>
                    <Link to='/register' className='text-decoration-none small'>Não tem uma conta? Cadastre-se</Link>
                </div>
            </div>
        </div>
    );
};