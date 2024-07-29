import jwt from 'jsonwebtoken';

export const auth =(req, res, next)=>{
    const header = req.headers['authorization'];
    const token = header && header.split(' ')[1];
    if(token == null) return res.sendStatus(401);
    jwt.verify(token, '', (err, decoded)=>{
        if(err) return res.sendStatus(403);
        req.id = decoded.userId;
        next();
    })
}