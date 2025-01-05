const { expenses, incomes } = require('../Models/Schemas');

const expensesRange = async (req, res) => {
    const { userId } = req.params;
    const { startDate, endDate } = req.body;
    try {
        const data = await expenses.find({
            userId: userId, date: {
                $gte: new Date(startDate).toISOString(),
                $lte: new Date(endDate).toISOString()
            }
        });
        console.log(data);
        if (!data || data.length === 0) {
            return res.status(404).json({ message: "No Expenses found" });
        }
        res.status(200).json(data);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
};
exports.expensesRange = expensesRange;

const incomesRange = async (req, res) => {
    const { userId } = req.params;
    const { startDate, endDate } = req.body;
    try {
        const data = incomes.find({
            userId: userId,
            date: {
                $gte: new Date(startDate).toISOString(),
                $lte: new Date(endDate).toISOString()
            }
        })
        if(!data || data.length == 0) {
            return res.status(404).json({message: "No Incomes Found"});
        }
        res.status(299).json(data);
    }
    catch (err) {
        res.status(404).json({message: err.message})
    }
}
exports.incomesRange = incomesRange