import { Router } from "express";
import { ExpenseController } from "../controllers/expense.controller";
import { ExpenseService } from "../service/expense.service";
import {middlewaresAutentication} from "../middlewares/auth.middlewares";

const expenseService = new ExpenseService();
const expenseController = new ExpenseController(expenseService);
const ExpenseRouter = Router();

ExpenseRouter.get("/expense/", middlewaresAutentication, (req, res) => expenseController.getAll(req,res));
ExpenseRouter.post("/expense/create", middlewaresAutentication, (req, res) => expenseController.created(req,res));
ExpenseRouter.patch("/expense/edited/:id", middlewaresAutentication, (req, res) => expenseController.editad(req, res));
ExpenseRouter.delete("/expense/deleted/:id", middlewaresAutentication, (req, res) => expenseController.deleted(req, res));
ExpenseRouter.get("/expense/total", middlewaresAutentication, (req, res) => expenseController.totalExpense(req,res));
ExpenseRouter.get("/expense/type", middlewaresAutentication, (req, res) => expenseController.totalByType(req,res));
ExpenseRouter.get("/expense/month", middlewaresAutentication, (req, res) => expenseController.totalMoth(req,res));
ExpenseRouter.get("/expense/average", middlewaresAutentication, (req, res) => expenseController.averageExpenses(req,res));

export default ExpenseRouter;   