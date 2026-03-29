import express from "express";
import { config } from "dotenv";
import "./database/connection";
import AuthRouter from "./routes/auth.routes";
import ExpenseRouter from  "./routes/expense.routes";

config();

const app = express();
app.use(express.json());
app.use('/auth', AuthRouter);
app.use('/CostFlow',ExpenseRouter);

const DOOR = 3000;

app.get("/", (req, res) => {
    res.send("Starting Server");
});

app.listen(DOOR, () =>{
    console.log(`Server: http://localhost:${DOOR} `)
})