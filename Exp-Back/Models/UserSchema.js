const mongoose = require('mongoose');

const expensesSchema = new mongoose.Schema({
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
        enum: ['Expense', 'Saving', 'Investment'],
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
    incomeSorces: {
        type: Array,
        of: incomeSchema,
        default: [],
    },
    expenses: {
        type: Array,
        of: expensesSchema,
        default: []
    },
    savingTarget: {
        type: Number,
        required: true,
    }
});

const users = mongoose.model("users", userSchema);
module.exports = users;