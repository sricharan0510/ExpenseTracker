const { expenses } = require('../Models/Schemas');

const YearTotal = async (req, res) => {
    const { userId, yearNo } = req.params;
    try {
        console.log(yearNo)
        const data = await expenses.aggregate([
            {
                $match: {
                    userId: userId,
                }
            },
            {
                $group: {
                    _id: { $month: "$date" },
                    totalYearExpense: { $sum: "$expenseAmount" }
                }
            },
            {
                $sort : {
                    _id : 1
                }
            }
        ]);
        if (!data || data.length == 0) {
            return res.status(404).json({ message: "There is no data" });
        }
        return res.status(200).json(data)
    }
    catch (err) {
        console.log(err.message)
    }
}
exports.YearTotal = YearTotal;

const MonthWiseData = async (req, res) => {
    const { userId, year, monthName } = req.params;
    try {
        const monthNames = {
            January: 1, February: 2, March: 3, April: 4, May: 5, June: 6, July: 7,
            August: 8, September: 9, October: 10, November: 11, December: 12
        };
        const month = monthNames[monthName];
        const nextMonth = month + 1;
        const startOfMonth = new Date(`${year}-${month < 10 ? '0' + month : month}-01T00:00:00.000Z`);
        const endOfMonth = new Date(startOfMonth);
        endOfMonth.setMonth(endOfMonth.getMonth() + 1);
        endOfMonth.setDate(0);
        endOfMonth.setHours(23, 59, 59, 999);
        console.log(startOfMonth, endOfMonth)
        console.log(typeof (startOfMonth), endOfMonth)
        const data = await expenses.aggregate([
            {
                $match: {
                    userId: userId,
                    date: {
                        $gte: startOfMonth,
                        $lt: endOfMonth
                    },
                },
            },
            {
                $group: {
                    _id: { $month: "$date" },
                    expenses: {
                        $push: {
                            "Catogary": "$category",
                            "CatogaryAmount": "$expenseAmount"
                        }
                    }
                }
            },
            {
                $unwind: "$expenses"
            },
            {
                $group: {
                    _id: "$expenses.Catogary",
                    Amount: {
                        $sum: "$expenses.CatogaryAmount"
                    }

                }
            },
        ]);
        if (!data || data.length === 0) {
            return res.status(404).json({ message: "Data Ledhu ra" });
        }
        return res.status(200).json(data)
    }
    catch (err) {
        res.status(404).json({ message: err.message })
    }
}

exports.MonthWiseData = MonthWiseData;



const monthlyTotal = async (req, res) => {
    const { userId, year } = req.params;
    try {
        const data = await expenses.aggregate([
            {
                $match: {
                    userId: userId
                }
            },
            {
                $group: {
                    _id: { $month: "$date" },
                    totalMonthExpense: { $sum: "$expenseAmount" }
                }
            },
            {
                $sort: {
                    _id: 1
                }
            }
        ])
    }
    catch (err) {
        console.log(err.message);
    }
}
exports.monthlyTotal = monthlyTotal;