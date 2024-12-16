const express = require("express");
const users = require("../Models/UserSchema");

const addExpense = async (req, res) => {
  const { edate, ename, eamt, ecat, epri, epm } = req.body;
  try {
    const user = await users.findOne({}); 
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }
    const formattedDate = new Date(edate).toISOString().split('T')[0];
    if (user.expenses && user.expenses[formattedDate]) {
      await users.updateOne(
        { _id: user._id },
        {
          $push: {
            [`expenses.${formattedDate}`]: {
              expenseName: ename,
              expenseAmount: eamt,
              category: ecat,
              priority: epri,
              paymentMethod: epm
            }
          }
        }
      );
    } else {
      await users.updateOne(
        { _id: user._id },
        {
          $set: {
            [`expenses.${formattedDate}`]: [
              {
                expenseName: ename,
                expenseAmount: eamt,
                category: ecat,
                priority: epri,
                paymentMethod: epm
              }
            ]
          }
        }
      );
    }
    res.status(201).send({ message: "Expense added successfully.",user });
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).send({ message: "Error adding expense.", error });
  }
};

module.exports = { addExpense };
