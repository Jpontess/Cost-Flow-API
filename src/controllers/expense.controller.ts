import { Request, Response } from "express";
import { ExpenseService } from "../service/expense.service";
import { Expense } from "../models/expense.model";

export class ExpenseController{
    constructor(private expenseService: ExpenseService){}

      async created(req: Request, res: Response){
      const {name, value} = req.body;
      const user_id = req.user?.id;
      try {
         
        await this.expenseService.created(req.body, user_id as number );
         return res.status(201).json( {message: `new expense created with success!`});
      } catch (error) {
         return res.status(400).json( {message: `Error: ${error}`});
      }
      };

      async getAll(req: Request, res: Response){
         try {
         const user_id = req.user?.id;
         const result = await this.expenseService.listAll(user_id as number);
         return res.status(200).json(result);
      } catch (error) {
         return res.status(400).json({message: `Error ${error}`})
      }
      }

      async editad(req: Request, res: Response){
         const {id} = req.params;
         const {name, value} = req.body;
         try {
         const result = await this.expenseService.edited({name, value, id} as any);
         return res.status(200).json( {message: "Expense edited with success"}); 
         } catch (error) {
            if (error instanceof Error){
               if (error.message === "Expense not found") return res.status(404).json({ message: error.message});
            };
            return res.status(400).json({message: `Error: ${error}`})
         };
      }
      async deleted(req: Request, res: Response){
         const {id} = req.params;
         try {
            const result = await this.expenseService.deleted({id} as any);
            return res.status(200).json({ message: "Expense deleted with success" });
         } catch (error) {
            if (error instanceof Error){
               if (error.message === "Expense not foud") return res.status(400).json(error.message);
            };
            return res.status(400).json({message: `Error: ${error}`});
         };
      };

      async totalExpense(req: Request, res: Response){
         const user_id = req.user?.id
         try {
            const result = await this.expenseService.totalExpense(user_id as number);
            return res.status(200).json( result )
         } catch (error) {
            return res.status(400).json( {message: `Error: ${error}`})
         }
      };

      async totalByType(req: Request, res: Response){
         const user_id = req.user?.id;
         try {
            const result = await this.expenseService.totalByType(user_id as number);
            return res.status(200).json(result);
         } catch (error) {
            return res.status(400).json( {message: `Error: ${error}`});
         }
      };

      async totalMoth(req: Request, res: Response){
         const user_id = req.user?.id;
         try {
            const result = await this.expenseService.totalByMonth(user_id as number);
            return res.status(200).json(result);
         } catch (error) {
            return res.status(400).json( {message: `Error: ${error}`});
         }
      }

      async averageExpenses(req: Request, res: Response){
         const user_id = req.user?.id;
         try {
            const result = await this.expenseService.averageExpenses(user_id as number);
            return res.status(200).json(result);
         } catch (error) {
            return res.status(400).json( {message: `Error: ${error}`})
         }
      }

}