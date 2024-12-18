const express = require("express");
const users = require("../Models/UserSchema");

const addExpense = async (req, res) => {
  const { edate, ename, eamt, ecat, epri, epm } = req.body;
  try {
    const user = await users.findOne({});
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }
    const formattedDate = new Date(edate).toISOString();
    user.allExpenses.map((expObj) => {
      if (expObj.ExpDate === formattedDate) {
        expObj.Expenses.push({
          expenseName: ename,
          expenseAmount: eamt,
          category: ecat,
          priority: epri,
          paymentMethod: epm
        });
      }
    })
    user.allExpenses.push({
      ExpDate: formattedDate,
      Expenses: [{
        expenseName: ename,
        expenseAmount: eamt,
        category: ecat,
        priority: epri,
        paymentMethod: epm
      }],
    });
    res.status(201).send({ message: "Expense added successfully.", user });
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).send({ message: "Error adding expense.", error });
  }
};

module.exports = { addExpense };
