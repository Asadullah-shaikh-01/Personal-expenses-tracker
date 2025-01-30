import mongoose from "mongoose";


const ExpenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trime: true,
        maxLength: 50,
    },
    amount: {
        type: Number,
        required: true,
        maxLength: 20,
        trime: true,
    },
    type: {
        type: String,
        default: "income"
    },
    date: {
        type: Date,
        required: true,
        trime: true,
    },
    category: {
        type: String,
        required: true,

        trime: true,
    },
    description: {
        type: String,
        required: true,
        maxLength: 20,
        trime: true,
    },
}, { timeStamp: true })

const expenseModel = mongoose.model("Expenses", ExpenseSchema)
export default expenseModel;
