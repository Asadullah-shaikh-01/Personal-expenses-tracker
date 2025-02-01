import expenseModel from "../models/expenseModel.js";

export const addexpense = async (req, res) => {
    try {
        const { title, amount, category, description, date,PaymentMethod } = req.body
        if (!title || !category || !description || !date || !PaymentMethod) {
            return res.status(401).send({
                sucess: false,
                message: "All Fields are required"
            })
        } else if (amount <= 0 || !amount === "Number") {
            return res.status(401).send({
                sucess: false,
                message: "Amount shoud be positive Number"
            })
        }

        const expense = await expenseModel({
            title,
            amount,
            category,
            description,
            date,
            PaymentMethod
        }).save();

        res.status(200).send({
            sucess: true,
            message: "Expenses Add Sucessfully",
            expense

        })

    } catch (error) {
        console.log(error);
        res.status(501).send({
            sucess: false,
            message: "Internal Server error",
            error
        })
    }
}

export const Getexpense = async (req, res) => {
    try {


        const expense = await expenseModel.find().sort({ createdAt: -1 });

        res.status(200).send({
            sucess: true,
            message: "expense get Sucessfully",
            expense
        })
    } catch (error) {
        console.log(error);
        res.status(501).send({
            sucess: false,
            message: "Internal Server error",
            error
        })
    }
}

export const deleteExpense = async (req, res) => {
    try {

        const { id } = req.params;
        const expense = await expenseModel.findByIdAndDelete(id);

        res.status(200).send({
            sucess: true,
            message: "expense Delete Sucessfully",
            expense
        })
    } catch (error) {
        console.log(error);
        res.status(501).send({
            sucess: false,
            message: "Internal Server error",
            error
        })
    }
}