const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: { type: String,unique: true, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    savingTarget: { type: Number, default: 0 },
});

const incomeSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    source: { type: String, required: true },
    incomeAmount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

const expenseSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    expenseName: { type: String, required: true },
    expenseAmount: { type: Number, required: true },
    category: {
        type: String,
        enum: ["Food", "Utilities", "Investment", "Savings", "Transportation", "Health & Wellness", "Shopping"],
        required: true
    },
    priority: { type: String, enum: ['High', 'Medium', 'Low'], required: true },
    paymentMethod: { type: String, enum: ['Cash', 'Card', 'UPI', 'Bank Transfer'], required: true },
    date: { type: Date, default: Date.now },
});

const users = mongoose.model("users", userSchema);
const incomes = mongoose.model("incomes", incomeSchema);
const expenses = mongoose.model("expenses", expenseSchema)

module.exports = {users, incomes, expenses};