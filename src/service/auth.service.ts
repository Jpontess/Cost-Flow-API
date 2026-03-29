import bcrypt from "bcrypt";
import pool from "../database/connection";
import { User } from "../models/user.model";
import  jwt  from "jsonwebtoken";
import { UserCreateDto } from "../models/dtos/create.user.dtos";

export class AuthService{

    async register(createUserDto: UserCreateDto){

        const UserExist = await pool.query('SELECT id FROM users WHERE name = $1', [createUserDto.name]);
        if (UserExist.rows.length > 0) throw new Error("User already exists!");

    
        const hashPassword = await bcrypt.hash(createUserDto.password, 10); // criptografando a senha do novo usuário

        // Criando novo usuário
        const newUser = await pool.query(
            'INSERT INTO users (name, password) VALUES ($1, $2) RETURNING id, name, created_in',
            [createUserDto.name, hashPassword]
        )

        return newUser.rows[0];
    }

    async login(user: User){

        const findUser = await pool.query('SELECT id, name, password FROM users WHERE name = $1', [user.name]);


        if (findUser.rows.length === 0) throw new Error("User not found");

        const hashCompare = await bcrypt.compare(user.password, findUser.rows[0].password);

        if (!hashCompare) throw new Error("User or password this is invalid");

        const token = jwt.sign(
            {id: findUser.rows[0].id, name: findUser.rows[0].name},
            process.env.SECRET as string,
            {expiresIn: '3d'}
        );

        return token;
    }
}