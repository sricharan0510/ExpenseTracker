const express = require('express')
const Route = express.Router();

const { UserDetails, checkUser} = require('../Controllers/UserAllDetails');
const { UserTotalIncome, UserTotalExpense } = require('../Controllers/TotalIncAndExp');
const { userIncomes, addIncome, updateIncome, deleteIncome } = require('../Controllers/IncomeAUD');

Route.post('/checkUser', checkUser);
Route.get('/UserDetails', UserDetails);
Route.get('/UserTotalIncome', UserTotalIncome);
Route.get('/UserTotalExpense', UserTotalExpense);
Route.get('/userIncomes', userIncomes);
Route.post('/addIncome', addIncome);
Route.post('/updateIncome', updateIncome);
Route.post('/deleteIncome', deleteIncome);

module.exports = Route;