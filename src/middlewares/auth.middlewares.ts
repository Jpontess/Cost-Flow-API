import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const middlewaresAutentication = (req: Request, res: Response, next: NextFunction) => {
    const tokenHeader = req.headers.authorization;

    if (!tokenHeader) return res.status(401).json( {message: "User not authorized"});

    const token = tokenHeader.split(" ")[1];

    jwt.verify(token, process.env.SECRET as string, function(err, decoded){
        if (err){
            return res.status(401).json({
                name: "JsonWebTokenError",
                message: "jwt not active"
            });
        }
        req.user = decoded as {id: number, name: string};
        next();
    });
}