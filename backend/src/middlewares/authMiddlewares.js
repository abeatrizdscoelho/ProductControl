import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET; //Cria e verifica os tokens.

const auth = (req, res, next) => { //'next' - Continua o processo, depois de passar pelo middleware.
    const token = req.headers.authorization

    //Verifica se o token existe.
    if (!token) {
        return res.status(401).json({message: 'Acesso negado.'});
    };

    try {
        //Checa se o token é válido com o 'verify', se for, retorna os dados dentro do token.
        const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
        req.user = { id: decoded.id};
        next(); 
    } catch (error) {
        return res.status(401).json({message: 'Token Inválido.'});
    };
};

export default auth;