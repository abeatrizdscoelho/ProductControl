import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

//CREATE
export const createProduct = async (req, res) => {
    const { name, description, stock, price, category } = req.body;
    const userId = req.user.id; //ID do Usuário logado.
    try {
        const newProduct = await prisma.product.create({ data: { name, description, stock, price, category, userId } });
        res.json(newProduct);
    } catch (error) {
        console.error('Erro ao cadastrar produto.', error);
        res.status(500).json({ error: 'Erro ao cadastrar produto no servidor.' });
    };
};

//READ
export const getAllProducts = async (req, res) => {
    const userId = req.user.id;
    try {
        const products = await prisma.product.findMany({ where: { userId: userId } });
        res.json(products);
    } catch (error) {
        console.error('Erro ao buscar produtos.', error);
        res.status(500).json({ error: 'Erro ao buscar produtos no servidor.' });
    };
};

//READ por ID
export const getProductById = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    try {
        const product = await prisma.product.findFirst({ where: { id: Number(id), userId: userId } });
        if (!product) {
            return res.status(404).json({ error: 'Produto não encontrado.' });
        }
        res.json(product);
    } catch (error) {
        console.error('Erro ao buscar produto.', error);
        res.status(500).json({ error: 'Erro ao buscar produto no servidor.' });
    };
};

//UPDATE
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, stock, price, category } = req.body;
    const userId = req.user.id;
    try {
        const product = await prisma.product.findFirst({ where: { id: Number(id), userId: userId } });
        if (!product) {
            return res.status(404).json({ error: 'Produto não encontrado ou não pertence a você.' });
        }
        const updatedProduct = await prisma.product.update({ where: { id: Number(id) }, data: { name, description, stock, price, category } });
        res.json(updatedProduct);
    } catch (error) {
        console.error('Erro ao atualizar produto.', error);
        res.status(500).json({ error: 'Erro ao atualizar produto no servidor.' });
    };
};

//DELETE
export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    try {
        const product = await prisma.product.findFirst({ where: { id: Number(id), userId: userId } });
        if (!product) {
            return res.status(404).json({ error: 'Produto não encontrado ou não pertece a você.' });
        }
        await prisma.product.delete({ where: { id: Number(id) } });
        res.json({ message: 'Produto deletado!' });
    } catch (error) {
        console.error('Erro ao deletar produto.', error);
        res.status(500).json({ error: 'Erro ao deletar produto no servidor.' });
    };
};