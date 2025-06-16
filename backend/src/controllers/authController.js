import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
const JWT_SECRET = process.env.JWT_SECRET;
const prisma = new PrismaClient();

//Cadastro
export const register = async (req, res) => {
    try {
        const user = req.body;
        const salt = await bcrypt.genSalt(10); //'Peso' da Encriptação de Senha.
        const hashPassword = await bcrypt.hash(user.password, salt);
        const userDB = await prisma.user.create({ data: { name: user.name, email: user.email, password: hashPassword } });
        res.status(201).json(userDB);
    } catch (error) {
        console.error('Erro ao cadastrar usuário.', error);
        res.status(500).json({ error: 'Erro ao cadastrar usuário no servidor.' });
    };
};

//Login
export const login = async (req, res) => {
    try {
        const userInfo = req.body;

        //Verifica se o email do usuário existe, busca-o no banco de dados.
        const user = await prisma.user.findUnique({where: {email: userInfo.email}}); 
        if (!user) {
            return res.status(404).json({message: 'Usuário não encontrado.'});
        };

        //Compara o hash (senha do banco) e a senha do usuário (que ele digitou), pra ver se combina.
        const isMatch = await bcrypt.compare(userInfo.password, user.password);  
        if (!isMatch) {
            return res.status(400).json({message: 'Senha inválida.'})
        };

        //Gera o Token JWT.
        const token = jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: '7d'}); //Tempo de expiração.

        res.status(200).json({token});
        
    } catch (error) {
        console.error('Erro no login do usuário.', error);
        res.status(500).json({ error: 'Erro ao logar usuário no servidor.' });
    };
};