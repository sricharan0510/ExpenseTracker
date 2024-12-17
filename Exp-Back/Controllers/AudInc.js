const express = require("express");
const users = require("../Models/UserSchema");

const AddIncome = async (req, res) => {
    const { source, incomeAmount } = req.body;
    try {
        const user = await users.findOneAndUpdate(
            {},
            { $push: { incomeSources: { source, incomeAmount } } },
        );
        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }
        res.status(201).send({ message: "Income added successfully.", user })
    } catch (error) {
        console.error("Error adding income:", error);
        res.status(500).send({ message: "Error adding income.", error });
    }
};

const UpdateIncome = async (req,res) => {
    const {source, newIncomeAmount} = req.body;
    try {
        const user = await users.findOneAndUpdate (
            {"incomeSources.source": source},
            {$set: {"incomeSources.$.incomeAmount": newIncomeAmount}},
        );
        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }
        res.status(201).send({ message: "Income updated successfully.", user });
    }
    catch (error) {
        console.error("Error updating income:", error);
        res.status(500).send({ message: "Error updating income.", error });
    }
}

const DeleteIncome = async (req, res) => {
    const { source } = req.body;
    try {
        const user = await users.findOneAndUpdate(
            {},
            { $pull: { incomeSources: { source } } },
        )
        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }
        res.status(201).send({ message: "Income deleted successfully.", user });
    }
    catch (error) {
        console.error("Error deleting income:", error);
        res.status(500).send({ message: "Error deleting income.", error });
    }
}

module.exports = { AddIncome, UpdateIncome, DeleteIncome};
