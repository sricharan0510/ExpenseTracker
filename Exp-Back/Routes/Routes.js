const express = require('express')
const Route = express.Router();
const ExpenseApi = require('../Controllers/ExpenseApi');
const { AddIncome } = require('../Controllers/AudInc');
const { UpdateIncome } = require('../Controllers/AudInc');
const { DeleteIncome } = require('../Controllers/AudInc');
const { addExpense } = require('../Controllers/AudExp');

Route.get('/ExpenseTracker', ExpenseApi.ExpenseApi);
Route.post('/addIncome', AddIncome);
Route.post('/updateIncome', UpdateIncome);  
Route.post('/deleteIncome', DeleteIncome);
Route.post('/addExpense', addExpense);

module.exports = Route;