const users = require("../Models/UserSchema");

const ExpenseApi = async(req, res) => {
    try {
        const data = await users.find();
        if (!data || data.length === 0) {
            return res.status(404).json({ message: "No data found" });
        }
        res.status(200).json(data);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

exports.ExpenseApi = ExpenseApi;
