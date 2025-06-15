import express from 'express';
import { PrismaClient } from '@prisma/client';
const router = express.Router();
const prisma = new PrismaClient();

router.get('/user-list', async (req, res) => {
    try {
        const users = await prisma.user.findMany({omit: {password: true}});
        res.status(200).json({message: 'Usuários listados com sucesso', users})
    } catch (error) {
        console.error('Falha no servidor.', error);
        res.status(500).json({ error: 'Falha no servidor.' });
    };
});

export default router;