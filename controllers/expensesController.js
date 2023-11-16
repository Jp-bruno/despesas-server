import Despesa from "../database/models/Expense.js"

const expensesController = {
    createExpense: async (req, res) => {
        try {
            const { titulo, valor, descricao, imagens } = req.body

            res.status(201).json({ error: false, message: "Ok" })
        } catch (e) {
            console.log(e)
            res.status(500).json({ error: true, message: e.message })
        }
    },
    getAllExpenses: async (req, res) => {
        try {
            const expenses = await Despesa.find().exec().catch(e => { throw e })

            res.status(200).json({ error: false, message: "Ok", data: expenses })
        } catch (e) {
            console.log(e)
            res.status(500).json({ error: true, message: e.message })
        }
    },
    getOneExpense: async (req, res) => {
        try {
            const id = req.params.expenseId;

            const expense = await Despesa.find({ _id: id }).exec().catch(e => { throw e })

            res.status(200).json({ error: false, message: "Ok", data: expense })
        } catch (e) {
            console.log(e)
            res.status(500).json({ error: true, message: e.message })
        }
    },
}

export default expensesController