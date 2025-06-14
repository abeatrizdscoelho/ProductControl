const cors = require('cors');
const express = require('express');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config({ path: '../.env' });

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

//CREATE
app.post('/products', async (req, res) => {
    try {
        const { name, description, stock, price, category } = req.body;
        const product = await prisma.product.create({ data: { name, description, stock, price, category } });
        res.json(product);
    } catch (error) {
        console.error('Erro ao cadastrar produto.', error);
        res.status(500).json({ error: 'Erro ao cadastrar produto no servidor.' });
    };
});

//READ
app.get('/products', async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.json(products);
    } catch (error) {
        console.error('Erro ao buscar produtos.', error);
        res.status(500).json({ error: 'Erro ao buscar produtos no servidor.' });
    };
});

//READ por ID
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await prisma.product.findUnique({ where: { id: Number(id) } });
        res.json(product);
    } catch (error) {
        console.error('Erro ao buscar produto.', error);
        res.status(500).json({ error: 'Erro ao buscar produto no servidor.' });
    };
});

//UPDATE
app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, stock, price, category } = req.body;
    try {
        const product = await prisma.product.update({ where: { id: Number(id) }, data: { name, description, stock, price, category } });
        res.json(product);
    } catch (error) {
        console.error('Erro ao atualizar produto.', error);
        res.status(500).json({ error: 'Erro ao atualizar produto no servidor.' });
    };
});

//DELETE
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.product.delete({ where: { id: Number(id) } });
        res.json({ message: 'Produto deletado!' });
    } catch (error) {
        console.error('Erro ao deletar produto.', error);
        res.status(500).json({ error: 'Erro ao deletar produto no servidor.' });
    };
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});