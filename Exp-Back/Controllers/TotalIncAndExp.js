const { incomes, expenses } = require('../Models/Schemas');

const UserTotalIncome = async (req, res) => {
    try {
        const data = await incomes.aggregate([
            {
                $match: { userId: "U001" }
            },
            {
                $group: {
                    _id: "$userId",
                    totalIncome: { $sum: "$incomeAmount" }
                }
            }
        ]);
        if (!data || data.length === 0) {
            return res.status(404).json({ message: "No data found" });
        }
        res.status(200).json(data);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}

const UserTotalExpense = async (req, res) => {
    try {
        const data = await expenses.aggregate([
            {
                $match: { userId: "U001" }
            },
            {
                $group: {
                    _id: "$userId",
                    totalExpense: { $sum: "$expenseAmount" }
                }
            }
        ]);
        if (!data || data.length === 0) {
            return res.status(404).json({ message: "No data found" });
        }
        res.status(200).json(data);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}

exports.UserTotalIncome = UserTotalIncome;
exports.UserTotalExpense = UserTotalExpense;