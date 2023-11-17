import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

export const UserSchema = new Schema({
    nome: {
        type: String,
        required: true,
        trim: true,
        maxLenght: 100
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        maxLenght: 100
    },
    senha: {
        type: String,
        required: true,
        maxLenght: 120
    },
    montante: {
        type: Number,
        required: true,
        default: 0,
        max: 9999999
    },
    despesas: {
        type: [Schema.Types.ObjectId],
        ref: "Despesas",
        default: []
    },
    depositos: {
        type: [Schema.Types.ObjectId],
        ref: "Depositos",
        default: []
    },
    notificacoes: {
        type: [Schema.Types.ObjectId],
        ref: "Notificacoes",
        default: []
    }
}, { timestamps: true })

UserSchema.statics.createUser = async function (nome, email) {
    if (!email || !nome) {
        throw Error("Preencha todos os campos corretamente.")
    }

    if (!validator.isEmail(email)) {
        throw Error("Preencha com um email válido.")
    }

    const emailExists = await this.findOne({ email })

    if (emailExists) {
        throw Error("Email já existe.")
    }

    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash("senha", salt)

    const user = await this.create({ nome, email, senha: hash })

    return user
}

UserSchema.statics.login = async function (email, senha) {
    if (!email || !senha) {
        throw Error("Preencha todos os campos corretamente.");
    }

    if (!validator.isEmail(email)) {
        throw Error("Email inválido.");
    }

    const user = await this.findOne({ email });

    if (!user) {
        throw Error("Usuário não existe");
    }

    const match = await bcrypt.compare(senha, user.senha);

    if (!match) {
        throw Error("Senha incorreta");
    }

    user.senha = ""

    return user
}

const User = mongoose.models.User || mongoose.model("User", UserSchema)

export default User