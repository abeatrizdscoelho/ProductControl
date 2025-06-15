import express from 'express';
import { PrismaClient } from '@prisma/client';
const router = express.Router();
const prisma = new PrismaClient();

//CREATE
router.post('/', async (req, res) => {
    const { name, description, stock, price, category } = req.body;
    try {
        const product = await prisma.product.create({ data: { name, description, stock, price, category } });
        res.json(product);
    } catch (error) {
        console.error('Erro ao cadastrar produto.', error);
        res.status(500).json({ error: 'Erro ao cadastrar produto no servidor.' });
    };
});

//READ
router.get('/', async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.json(products);
    } catch (error) {
        console.error('Erro ao buscar produtos.', error);
        res.status(500).json({ error: 'Erro ao buscar produtos no servidor.' });
    };
});

//READ por ID
router.get('/:id', async (req, res) => {
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
router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.product.delete({ where: { id: Number(id) } });
        res.json({ message: 'Produto deletado!' });
    } catch (error) {
        console.error('Erro ao deletar produto.', error);
        res.status(500).json({ error: 'Erro ao deletar produto no servidor.' });
    };
});

export default router;