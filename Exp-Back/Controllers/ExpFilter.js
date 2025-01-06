const { expenses } = require('../Models/Schemas');

const ExpFilter = async (req, res) => {
    const { userId } = req.params;
    const { priority } = req.body;
    try {
        const data = await expenses.aggregate([
            {
                $match: {
                    userId: userId,
                    priority: priority
                }
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