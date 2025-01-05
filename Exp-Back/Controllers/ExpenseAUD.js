const { expenses } = require('../Models/Schemas');

const userExpenses = async (req, res) => {
    const { userId } = req.params;
    try {
        const data = await expenses.find({ userId: userId });
        if (!data || data.length === 0) {
            return res.status(404).json({ message: "No Expenses found" });
        }
        res.status(200).json(data);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}
exports.userExpenses = userExpenses;

const addExpense = async (req, res) => {
    const { userId } = req.params;
    const { expenseName, category, expenseAmount, priority, paymentMethod } = req.body;
    try {
        const data = new expenses(
            {
                userId: userId,
                expenseName: expenseName,
                expenseAmount: expenseAmount,
                category: category,
                priority: priority,
                paymentMethod: paymentMethod,
                date: new Date()
            }
        )
        const result = await data.save();
        res.status(200).json({ data: result });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}
exports.addExpense = addExpense;

const updateExpense = async (req, res) => {
    const { userId } = req.params;
    const { expenseName, ...updateFields } = req.body;
    try {
        const data = await expenses.updateOne(
            { userId: userId, expenseName: expenseName },
            { $set: updateFields }
        );
        if (!data || data.nModified === 0) {
            return res.status(404).json({ message: "No expense found or no changes made" });
        }
        res.status(200).json({ data });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}
exports.updateExpense = updateExpense;

const deleteExpense = async (req, res) => {
    const { userId } = req.params;
    const { expenseName } = req.body;
    try {
        const data = await expenses.deleteOne({ userId: userId, expenseName: expenseName });
        if (!data || data.deletedCount === 0) {
            return res.status(404).json({ message: "No expense found" });
        }
        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}
exports.deleteExpense = deleteExpense;