import { Router } from "express";
import expensesController from "../controllers/expensesController.js";

const expensesRouter = Router();

expensesRouter.post("/createExpense", (req, res) => expensesController.createExpense(req, res))
expensesRouter.get("/", (req, res) => expensesController.getAllExpenses(req, res))
expensesRouter.get("/:expenseId", (req, res) => expensesController.getAllExpenses(req, res))

export default expensesRouter