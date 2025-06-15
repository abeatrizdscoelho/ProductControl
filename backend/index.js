import cors from 'cors';
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import authPrivateRoutes from './routes/authPrivateRoutes.js';
import auth from './middlewares/authMiddlewares.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes); //Rotas públicas.
app.use('/auth', auth, authPrivateRoutes); //Antes de qualquer rota privada, ele passa pelo middleware.
app.use('/products', productRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});