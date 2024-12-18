const mongoose = require('mongoose');

const AllExpenses = new mongoose.Schema({
    expenseName: {
        type: String,
        required: true,
    },
    expenseAmount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        enum: [
            "Food", "Utilities", "Investment", "Savings", "Transportation", "Health & Wellness", "Shopping"],          
        required: true,
    },
    priority: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['Cash', 'Card', 'UPI', 'Bank Transfer'],
        required: true
    }
});

const expensesSchema = new mongoose.Schema({
    ExpDate: {
        type: Date,
        required: true,
    },
    Expenses: {
        type: [AllExpenses],
        required: true
    }
});

const incomeSchema = new mongoose.Schema({
    source: {
        type: String,
        required: true,
    },
    incomeAmount: {
        type: Number,
        required: true,
    },
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    incomeSources: {
        type: [incomeSchema],
        default: [],
    },
    allExpenses: {
        type: [expensesSchema],
        default: []
    },
    savingTarget: {
        type: Number,
        required: true,
    }
});


const users = mongoose.model("users", userSchema);
module.exports = users;