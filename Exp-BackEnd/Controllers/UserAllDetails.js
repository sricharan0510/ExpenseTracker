const { users } = require("../Models/Schemas");

const checkUser = async (req, res) => {
    const { userId, password } = req.body;
    try {
        const data = await users.find({ userId: userId, password: password });
        if (!data || data.length === 0) {
            return res.status(404).json({ message: "No data found" });
        }
        res.status(200).json(data);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}
exports.checkUser = checkUser;

const addUser = async (req, res) => {
    const { userId, name, email, password, savingTarget } = req.body;
    try {
        const data = new users({ userId, name, email, password, savingTarget });
        await data.save();
        res.status(200).json({message: "User added successfully"});
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}
exports.addUser = addUser;

const UserDetails = async (req, res) => {
    const { userId } = req.params;
    try {
        const data = await users.aggregate([
            {
                $match: { userId: userId }
            },
            {
                $lookup: {
                    from: "incomes",
                    localField: "userId",
                    foreignField: "userId",
                    as: "incomeDetails"
                }
            },
            {
                $lookup: {
                    from: "expenses",
                    localField: "userId",
                    foreignField: "userId",
                    as: "expenseDetails"
                }
            },
            {
                $addFields: {
                    totalIncome: { $sum: "$incomeDetails.incomeAmount" },
                    totalExpense: { $sum: "$expenseDetails.expenseAmount" }
                }
            },
            {
                $addFields: {
                    balanceAmount: { $subtract: ["$totalIncome", "$totalExpense"] },
                }
            },
            {
                $project: {
                    _id: 0,
                    userId: 1,
                    name: 1,
                    email: 1,
                    password: 1,
                    savingTarget: 1,
                    totalIncome: 1,
                    totalExpense: 1,
                    balanceAmount: 1,
                    // incomeDetails: 1,
                    // expenseDetails: 1
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

exports.UserDetails = UserDetails;