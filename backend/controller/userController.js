import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../util/hashPassword.js";
import JWT from 'jsonwebtoken'

export const registerController = async (req, res) => {
    try {
        const { Username, Email, Password } = req.body
        if (!Username || !Email || !Password) {
            return res.status(401).send({
                sucess: false,
                message: "All Fields are required"
            })
        }

        const Existinguser = await userModel.find({ Email });
        if (!Existinguser) {
            return res.status(401).send({
                sucess: false,
                message: "User Already Existing Please check"
            })
        }

        const hashedPassword = await hashPassword(Password);
        const user = await userModel({
            Username,
            Email,
            Password: hashedPassword,

        }).save();

        res.status(200).send({
            sucess: true,
            message: "User Created Sucessfully",
            user

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


export const loginController = async (req, res) => {
    try {
        const { Email, Password } = req.body
        if (!Email || !Password) {
            return res.status(401).send({
                sucess: false,
                message: "All Fields are required"
            })
        }

        // Find user by email
        const user = await userModel.findOne({ Email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found. Please register.",
            });
        }

        const match = await comparePassword(Password, user.Password);

        if (!match) {
            return res.status(401).send({
                sucess: false,
                message: "Inavlid Password"
            })
        }

        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "10d" });



        res.status(200).send({
            sucess: true,
            message: "User login Sucessfully",
            user: {
                Username: user.Username,
                Email: user.Email,
            },
            token

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



export const logoutController = async (req, res) => {
    try {
        // Clear the authentication cookie
        res.clearCookie("token", {
            httpOnly: true,
            secure: true, // Set to true if using HTTPS
            sameSite: "strict", // Adjust based on your app's requirements
        });
        res.status(200).send({
            sucess: true,
            message: "User logout Sucessfully",


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