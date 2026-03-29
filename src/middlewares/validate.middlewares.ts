import { plainToInstance } from "class-transformer"
import { NextFunction, Request, Response } from "express"
import { validate } from "class-validator"

export const validateDto = (DtoClass: any) => { 
    return async (req: Request, res: Response, next: NextFunction) =>{
        const dto = plainToInstance(DtoClass, req.body);

        const errors = await validate(dto);

        if (errors.length > 0){
            const messagesErro = errors.map(erro => Object.values(erro.constraints || {})).flat();
            return res.status(400).json({message: messagesErro})
        }
        next();
    }
}