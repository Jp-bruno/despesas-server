import mongoose from "mongoose";

export const DepositSchema = new mongoose.Schema({
    emissor: {
        type: mongoose.Types.ObjectId,
        ref: "Users",
        required: true
    },
    receptor: {
        type: mongoose.Types.ObjectId,
        ref: "Users",
        required: true
    },
    valor: {
        type: Number,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    imagem: {
        type: String
    }

}, { timestamps: true });

const Deposito = mongoose.models.Deposito || mongoose.model("Deposito", DepositSchema, "Depositos")

export default Deposito