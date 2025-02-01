import IncomeModel from "../models/incomeModel.js";




export const addIncome = async (req, res) => {
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

        const income = await IncomeModel({
            title,
            amount,
            category,
            description,
            date
        }).save();

        res.status(200).send({
            sucess: true,
            message: "Income Add Sucessfully",
            income

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

export const GetIncome = async (req, res) => {
    try {
      
        const income = await IncomeModel.find().sort({ createdAt: -1 });

        res.status(200).send({
            sucess: true,
            message: "Income get Sucessfully",
            income
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

export const deleteIncome = async (req, res) => {
    try {

        const { id } = req.params;
        const income = await IncomeModel.findByIdAndDelete(id);

        res.status(200).send({
            sucess: true,
            message: "Income Delete Sucessfully",
            income
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