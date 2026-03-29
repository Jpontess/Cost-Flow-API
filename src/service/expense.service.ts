import pool from "../database/connection"
import { CreateExpenseDto } from "../models/dtos/create.expense.dto";
import {Expense} from "../models/expense.model"

export class ExpenseService{

    async created(expenseDto: CreateExpenseDto, user_id: number){
        const newExpense = await pool.query(
        "INSERT INTO expenses (name, value, user_id) VALUES ($1, $2, $3) RETURNING id, name, value, user_id, created_in",
        [expenseDto.name, expenseDto.value, user_id]);

        return newExpense.rows[0];
    };

    async listAll(user_id: number){
        const queryList = await pool.query("SELECT * FROM expenses WHERE user_id = $1",[user_id]);
        return queryList.rows;
    };
    

    async edited(expenseDto: Expense){
        const editedQuery = await pool.query(
            "UPDATE expenses SET name = $1, value = $2, edited_in = NOW() WHERE id = $3 RETURNING *", 
            [expenseDto.name, expenseDto.value, expenseDto.id] 
        );

        if (editedQuery.rows.length === 0) return Error("Expense not found");

        return editedQuery.rows[0];
    };

    async deleted(expenseDto: Expense) {

        const existExpense = await pool.query(
            "SELECT id FROM expenses WHERE id = $1", [expenseDto.id]
        );
        
        if (existExpense.rows.length === 0) return Error("Expense not foud");

        const deletedQuery = await pool.query(
            "DELETE FROM expenses WHERE id = $1",[expenseDto.id]
        );

        return {message: `Expense ${expenseDto.name} deleted with success`};
    };

    //Obtendo o total de despesas
    async totalExpense(user_id: number){
        const totalResult = await pool.query(
            "SELECT SUM(value) as total FROM expenses WHERE user_id = $1", [user_id]
        );
        return totalResult.rows[0];
    };

    //O total por tipo despesa (Variavel e Fixa)
    async totalByType(user_id: number){
        const totalResult = await pool.query(
            "SELECT type, SUM(value) as total FROM expenses WHERE user_id = $1 GROUP BY type", [user_id]
        );
        return totalResult.rows;
    };

    //total por mês
    async totalByMonth(user_id: number){
        const totalResult = await pool.query(
            `SELECT 
            TO_CHAR(created_in, 'YYYY-MM') as month,
            SUM(value) as total
            FROM expenses 
            WHERE user_id = $1 
            GROUP BY TO_CHAR(created_in, 'YYYY-MM')
            ORDER BY month DESC`,
            [user_id]
        );
        return totalResult.rows;
    };

    //média de gastos
    async averageExpenses(user_id: number){
        const avarege = await pool.query(
            "SELECT ROUND(AVG(value), 2) as average FROM expenses WHERE user_id = $1",[user_id]
        );

        return avarege.rows[0];
    }
}