const express = require('express')
const Route = express.Router();

const { UserDetails, checkUser } = require('../Controllers/UserAllDetails');
const { UserTotalIncome, UserTotalExpense, ExpCatSum } = require('../Controllers/AmountSum');
const { userIncomes, addIncome, updateIncome, deleteIncome } = require('../Controllers/IncomeAUD');
const { userExpenses, addExpense, updateExpense, deleteExpense } = require('../Controllers/ExpenseAUD')
const { expensesRange, incomesRange, ExpFilter } = require('../Controllers/Filtering');

Route.post('/checkUser', checkUser);

Route.get('/:userId/UserDetails', UserDetails);

Route.get('/:userId/UserTotalIncome', UserTotalIncome);
Route.get('/:userId/UserTotalExpense', UserTotalExpense);
Route.post('/:userId/ExpCatSum', ExpCatSum)

Route.get('/:userId/userIncomes', userIncomes);
Route.post('/:userId/addIncome', addIncome);
Route.post('/:userId/updateIncome', updateIncome);
Route.post('/:userId/deleteIncome', deleteIncome);

Route.get('/:userId/userExpenses', userExpenses);
Route.post('/:userId/addExpense', addExpense);
Route.post('/:userId/updateExpense', updateExpense);
Route.post('/:userId/deleteExpense', deleteExpense);

Route.post('/:userId/expensesRange', expensesRange);
Route.post('/:userId/incomesRange', incomesRange);
Route.post('/:userId/ExpFilter', ExpFilter);

module.exports = Route;