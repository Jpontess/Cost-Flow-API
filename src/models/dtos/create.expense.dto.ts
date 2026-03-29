import { IsIn, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { isKeyObject } from "node:util/types";


export class CreateExpenseDto{
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsNumber()
    @IsNotEmpty()
    value!: number;

    @IsString()
    @IsIn(["Fixed", "Variable"])
    type!: string

}