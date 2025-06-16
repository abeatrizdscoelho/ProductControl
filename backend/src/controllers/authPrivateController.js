import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const userList = async (req, res) => {
    try {
        const users = await prisma.user.findMany({select: {id: true, name: true, email: true}});
        res.status(200).json({message: 'Usuários listados com sucesso', users})
    } catch (error) {
        console.error('Falha no servidor.', error);
        res.status(500).json({ error: 'Falha no servidor.' });
    };
};