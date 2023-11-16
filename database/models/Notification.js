import mongoose from "mongoose";

export const NotificacaoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
    },
    descricao: {
        type: String,
        required: true,
    },
    usuarioEmissor: {
        type: mongoose.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    usuarioReceptor: {
        type: mongoose.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    lida: {
        type: Boolean,
        default: false,
        required: true,
    },
    dataLeitura: {
        type: Date,
    }
}, { timestamps: true })

const Notificacao = mongoose.models.Notificacao || mongoose.model("Notificacao", NotificacaoSchema, "Notificacoes");

export default Notificacao