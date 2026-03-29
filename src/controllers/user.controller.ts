import { Request, Response } from "express";
import pool from "../database/connection";
import bcrypt from "bcrypt";
import { AuthService } from "../service/auth.service";


export class UserController{

    constructor(private authService: AuthService) {};

   async userRegister(req: Request, res: Response){
        console.log(req.body);
        const {name, password} = req.body;

        try{
           await this.authService.register(req.body);
            return res.status(201).json({ message: `User ${name} created with success!`})
        } 
        catch (error) {
            if (error instanceof Error){
                if(error.message === "User already exists!"){
                    return res.status(409).json({ message: error.message});
                }else{
                    return res.status(500).json( {message: `Error: ${error}`})
                }
            }
            return res.status(500).json({ message: 'Unknown error' })
        }
    }

    async userLogin(req: Request, res: Response){
        const {name, password} = req.body;

        try {
          const token = await this.authService.login(req.body);
            return res.status(200).json(token);
        } catch (error) {
            if (error instanceof Error){
                if (error.message === "User not found") return res.status(401).json( {message: error.message});
            }
            return res.status(409).json( {message: `Error: ${error}`});
        }
    }
}