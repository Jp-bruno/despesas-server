import mongoose from "mongoose";
import User from "../database/models/User.js";
import jwt from "jsonwebtoken";

const usersController = {
    createUser: async (req, res) => {
        try {
            const { nome, email } = req.body;

            await User.createUser(nome, email).catch(e => { throw e });

            res.status(200).json({ error: false, message: "Usuário criado com sucesso." });
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: true, message: e.message });
        }
    },
    deleteUser: async (req, res) => {
        try {
            const id = req.params.userId

            await User.deleteOne({ _id: new mongoose.Types.ObjectId(id) }).exec().catch(e => { throw e })

            res.status(204).json({ error: false, message: "Usuário excluído com sucesso." })
        } catch (e) {
            console.log(e)
            res.status(500).json({ error: true, message: e.message })
        }
    },
    authUser: async (req, res) => {
        try {
            const { email, senha } = req.body;

            const user = await User.login(email, senha).catch(e => { throw e });

            const token = jwt.sign({ user }, process.env.CK_SECRET);

            res.cookie("token", token, {
                maxAge: 60 * 60 * 24 * 1000,
                httpOnly: true,
                sameSite: "none",
                secure: true,
                signed: true
            });

            res.status(200).json({ error: false, message: "Usuário encontrado", data: user });
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: true, message: e.message });
        }
    },
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find().exec().catch(e => { throw e });

            res.status(200).json({ error: false, message: "Ok", data: users });
        } catch (e) {
            console.log(e)
            res.status(500).json({ error: true, message: e.message });
        }
    },
    getOneUser: async (req, res) => {
        try {
            const id = req.params.userId

            if (id === "1") {
                res.status(200).json({ error: false, message: "Ok" })
                return
            }

            const user = await User.findOne({ _id: new mongoose.Types.ObjectId(id) }).exec().catch(e => { throw e })

            res.status(200).json({ error: false, message: "Ok", data: user })
        } catch (e) {
            console.log(e)
            res.status(500).json({ error: true, message: e.message })
        }
    },
    verifyAuth: async (req, res) => {
        try {
            res.status(200).json({ error: false, message: "Ok", isAuth: req.user ? req.user : false })
        } catch (e) {
            console.log(e)
            res.status(500).json({ error: true, message: e.message })
        }
    },
    logOff: async (req, res) => {
        try {
            res.clearCookie("token")
            res.status(200).json({ error: false, message: "Ok" })
        } catch (e) {
            console.log(e)
            res.status(500).json({ error: true, message: e.message })
        }
    }
}

export default usersController;