import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => { //'next' - Continua o processo, depois de passar pelo middleware.
    const token = req.headers.authorization
    if (!token) {
        return res.status(401).json({message: 'Acesso negado.'})
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({message: 'Token Inválido.'});
    };
};



export default auth;