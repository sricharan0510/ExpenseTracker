const { expenses } = require('../Models/Schemas');

const YearTotal = async (req, res) => {
    const { userId, yearNo } = req.params;
    try {
        console.log(yearNo)
        const data = await expenses.aggregate([
            {
                $match: {
                    userId: userId,
                    date: {
                        $gte: new Date(`${yearNo}-01-01T00:00:00.000Z`),
                        $lt: new Date(`${parseInt(yearNo) + 1}-01-01T00:00:00.000Z`)
                    }
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
        ]);

        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const result = data.map(item => ({
            month: monthNames[item._id - 1],
            totalMonthExpense: item.totalMonthExpense
        }));

        if (!result || result.length == 0) {
            return res.status(404).json({ message: "There is no data" });
        }
        return res.status(200).json(result);
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
                    },
                    totalMonthExpense: { $sum: "$expenseAmount" }
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


const categoryWiseDat = async (req, res) => {
    const { userId, year, month, cat } = req.params;
    try {
        const monthNames = {
            January: 1, February: 2, March: 3, April: 4, May: 5, June: 6, July: 7,
            August: 8, September: 9, October: 10, November: 11, December: 12
        };
        const monthNo = monthNames[month]
        const nextMonth = monthNo + 1;
        const startOfMonth = new Date(`${year}-${monthNo < 10 ? '0' + monthNo : monthNo}-01T00:00:00.000Z`);
        const endOdMonth = new Date(`${year}-${(nextMonth) < 10 ? '0' + (nextMonth) : (nextMonth)}-01T00:00:00.000Z`)
        const data = await expenses.aggregate([
            {
                $match: {
                    userId: userId,
                    date: {
                        $gte: startOfMonth,
                        $lt: endOdMonth
                    },
                    category: cat
                }
            },
            {
                $facet: {
                    priorities: [
                        {
                            $group: {
                                _id: "$priority",
                                totalPriority: {
                                    $sum: "$expenseAmount"
                                }
                            }
                        }
                    ],
                    paymentMethods: [
                        {
                            $group: {
                                _id: "$paymentMethod",
                                totalPaymentMethod: {
                                    $sum: "$expenseAmount"
                                }
                            }
                        }
                    ]
                }
            }
        ]
        )
        if(!data || data.length=== 0 ) {
            return res.status(404).json({message: "Data not found"})
        }
        return res.status(200).json(data)
    }
    catch (err) {
        return res.status(400).json({ message: err.message })
    }
}

exports.categoryWiseDat = categoryWiseDat;