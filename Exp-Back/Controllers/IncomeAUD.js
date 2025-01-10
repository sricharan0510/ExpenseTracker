const { incomes } = require('../Models/Schemas');

const userIncomes = async (req, res) => {
    const { userId } = req.params;
    try {
        const data = await incomes.find({ userId: userId });
        if (!data || data.length === 0) {
            return res.status(404).json({ message: "No data found" });
        }
        res.status(200).json(data);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}

exports.userIncomes = userIncomes;

const addIncome = async (req, res) => {
    const { userId } = req.params;
    const { source, incomeAmount, date } = req.body;
    try {
        const data = new incomes(
            {
                userId: userId,
                source: source,
                incomeAmount: incomeAmount,
                date: new Date(date)
            }
        )
        const result = await data.save();
        res.status(200).json({ data: result });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

exports.addIncome = addIncome;

const updateIncome = async (req, res) => {
    const { userId } = req.params;
    const { source, newIncomeAmount } = req.body;
    try {
        const updatedData = await incomes.findOneAndUpdate(
            { userId: userId, source: source },
            {
                $set: { incomeAmount: newIncomeAmount, date: new Date() }
            },
            { new: true }
        );
        if (!updatedData) {
            return res.status(404).json({ message: "No Income found" });
        }
        res.status(200).json({ updatedData });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

exports.updateIncome = updateIncome;

const deleteIncome = async (req, res) => {
    const { userId } = req.params;
    const { source } = req.body;
    try {
        const deletedData = await incomes.findOneAndDelete(
            { userId: userId, source: source }
        );
        if (!deletedData) {
            return res.status(404).json({ message: "No Income found" });
        }
        res.status(200).json({ message: "Data deleted successfully" });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}
exports.deleteIncome = deleteIncome;