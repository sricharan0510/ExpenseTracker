const express = require('express')
const Route = express.Router();

const UserDetails = require('../Controllers/UserAllDetails');
const { UserTotalIncome, UserTotalExpense } = require('../Controllers/TotalIncAndExp');

Route.get('/UserDetails', UserDetails.UserDetails);
Route.get('/UserTotalIncome', UserTotalIncome);
Route.get('/UserTotalExpense', UserTotalExpense);

module.exports = Route;