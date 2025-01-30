import express from 'express'
import { loginController, logoutController, registerController } from '../controller/userController.js';
import { signInRequired } from '../middleware/userAuth.js';



const route = express.Router();

//register user
route.post('/register', registerController)

//login user
route.post('/login', loginController)

//logout user
route.post('/logout', signInRequired, logoutController);

//protected User route auth
route.get("/user-auth", signInRequired, (req, res) => {
    res.status(200).send({ ok: true });
  });

export default route;