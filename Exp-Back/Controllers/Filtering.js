const { expenses, incomes } = require('../Models/Schemas');

const incomesRange = async (req, res) => {
    const { userId } = req.params;
    const { fromDate, toDate } = req.body;
    try {
        const data = await incomes.aggregate([
            {
                $match: {
                    userId: userId,
                    date: {
                        $gte: new Date(fromDate).toISOString(),
                        $lte: new Date(toDate).toISOString()
                    }
                }
            }
        ])
        if (!data || data.length === 0) {
            return res.status(404).json({ message: "No Incomes Found" });
        }
        res.status(299).json(data);
    }
    catch (err) {
        res.status(404).json({ message: err.message })
    }
}
exports.incomesRange = incomesRange


const expensesRange = async (req, res) => {
    const { userId } = req.params;
    var { fromDate, toDate, category } = req.body;
    const fd = fromDate.replace(/-/g, '');
    if (toDate === undefined || toDate === "" || toDate === null) {
        toDate = new Date().toISOString().split('T')[0];
    }
    const td = toDate.replace(/-/g, '');
    if (td < fd) {
        return res.status(400).json({ message: "Invalid Date Formate" })
    }
    console.log(fromDate, toDate);
    try {
        const data = await expenses.aggregate([
            {
                $match: {
                    userId: userId,
                    date: {
                        $gte: new Date(fromDate).toISOString(),
                        $lte: new Date(toDate).toISOString()
                    },
                    category: category
                }
            }
        ])
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


const ExpFilter = async (req, res) => {
    const { userId } = req.params;
    const filterFields = req.body;
    try {
        const mc = { userId: userId };
        for (const [key, value] of Object.entries(filterFields)) {
            if (true) mc[key] = value;
        }

        const data = await expenses.aggregate([
            {
                $match: mc
            }
        ])
        if (!data || data.length === 0) {
            return res.status(404).json({ message: "No Expense Found With selected Filter" });
        }
        res.status(200).json(data);
    }
    catch (err) {
        res.status(404).json({ message: err.message })
    }
}

exports.ExpFilter = ExpFilter;