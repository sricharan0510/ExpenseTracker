const { incomes, expenses } = require('../Models/Schemas');

const ExpCatSum = async (req, res) => {
    try {
        const { userId } = req.params;
        const { category } = req.body;
        console.log(userId, category);
        const data = await expenses.aggregate([
            {
                $match: {
                    userId: userId,
                    category: category
                }
            },
            {
                $group: {
                    _id: category,
                    CategoryAmount: { $sum: "$expenseAmount" }
                }
            }

        ])
        console.log(data);
        if (!data || data.length === 0) {
            return res.status(404).json({ message: "No Category or User Found" });
        }
        res.status(200).json(data);
    }
    catch (err) {
        res.status(404).json({ message: err.message })
    }
}
exports.ExpCatSum = ExpCatSum;