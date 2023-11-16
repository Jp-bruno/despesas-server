import jwt from "jsonwebtoken";

export default function jwtCheck(req, res, next) {

    try {
        const token = req.signedCookies.token

        const user = jwt.verify(token, process.env.CK_SECRET)

        req.user = user.user

        next()
    } catch (e) {
        next()
    }
}