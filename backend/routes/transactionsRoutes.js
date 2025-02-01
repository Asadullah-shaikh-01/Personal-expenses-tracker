import express from 'express'
import { addIncome, deleteIncome, GetIncome } from '../controller/transactionsController.js';
import { addexpense, deleteExpense, Getexpense } from './../controller/expenseController.js';
import { signInRequired } from './../middleware/userAuth.js';

const route = express.Router();

//add income
route.post('/add-income', signInRequired, addIncome)
//get income
route.get('/get-income', GetIncome)
//delete income
route.delete('/delete-income/:id', signInRequired, deleteIncome)





//add expenses
route.post('/add-expenses', signInRequired, addexpense)

//get expenses
route.get('/get-expenses', Getexpense)

//delete expenses
route.delete('/delete-expenses/:id', signInRequired, deleteExpense)


export default route;