import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { AuthService } from "../service/auth.service";
import { validateDto } from "../middlewares/validate.middlewares";
import { UserCreateDto } from "../models/dtos/create.user.dtos";

const AuthRouter = Router();

const authService = new AuthService()

const userController = new UserController(authService);

AuthRouter.post("/user/register",validateDto(UserCreateDto),(req,res) => userController.userRegister(req, res));
AuthRouter.post("/user/login", (req, res) => userController.userLogin(req,res));

export default AuthRouter;