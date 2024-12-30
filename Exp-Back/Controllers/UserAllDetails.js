const {users} = require("../Models/Schemas");

const UserDetails = async (req, res) => {
    try {
        const data = await users.aggregate([
            {
                $match: { userId: "U001" }
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
                $project: {
                    _id: 0,
                    userId: 1,
                    name: 1,
                    email: 1,
                    savingTarget: 1,
                    incomeDetails: 1,
                    expenseDetails: 1
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