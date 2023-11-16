import mongoose from "mongoose";

export const DespesaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    responsavel: {
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
    imagens: {
        type: String
    }

}, { timestamps: true });

const Despesa = mongoose.models.Despesa || mongoose.model("Despesa", DespesaSchema, "Despesas")

export default Despesa