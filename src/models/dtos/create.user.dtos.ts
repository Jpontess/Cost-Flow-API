import { IsString, MaxLength, MinLength } from "class-validator";

export class UserCreateDto{
    @IsString()
    @MaxLength(20, {message: "O seu nome de usuário tem que ser entre 0 e 20 caracteres"})
    name!: string;

    
    @IsString()
    @MinLength(4, {message: "Sua senha deve ter mais que 4 caracteres"})
    password!: string;
}