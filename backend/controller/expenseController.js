import expenseModel from "../models/expenseModel.js";

export const addexpense = async (req, res) => {
    try {
        const { title, amount, category, description, date } = req.body
        if (!title || !category || !description || !date) {
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
            date
        }).save();

        res.status(200).send({
            sucess: true,
            message: "Income Add Sucessfully",
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


        const income = await expenseModel.find().sort({ createdAt: -1 });

        res.status(200).send({
            sucess: true,
            message: "Income get Sucessfully",
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
        const income = await expenseModel.findByIdAndDelete(id);

        res.status(200).send({
            sucess: true,
            message: "Income Delete Sucessfully",
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