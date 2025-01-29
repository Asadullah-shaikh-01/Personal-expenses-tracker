import JWT from "jsonwebtoken"


export const signInRequired = async (req, res, next) => {

    try {
        const decode = await JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
        res.status(501).send({
            success: false,
            message: "invalid Token",
        })

    }
}