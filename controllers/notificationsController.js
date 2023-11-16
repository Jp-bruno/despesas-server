import Notificacao from "../database/models/Notification.js";


const notificationsController = {
    createNotification: async (req, res) => {
        try {
            const { titulo, descricao, usuarioReceptor } = req.body;

            await Notificacao.create({
                titulo,
                descricao,
                usuarioEmissor: req.user._id,
                usuarioReceptor
            }).catch(e => { throw e });

            res.status(200).json({ error: false, message: "" });
        } catch (e) {
            console.log(e);
            res.status(200).json({ error: true, message: e.message });
        }
    },
    getUserNotifications: async (req, res) => {
        try {
            const id = req.params.userId

            const notifications = await Notificacao.find({ usuarioReceptor: id }).exec().catch(e => { throw e })

            res.status(200).json({ error: false, message: "Ok", data: notifications })
        } catch (e) {
            console.log(e)
            res.status(200).json({ error: true, message: e.message })
        }
    },
    setNotificationReadState: async (req, res) => {
        try {
            await Notificacao.updateOne({
                $set: {
                    dataLeitura: new Date(Date.now()),
                    lida: true
                }
            }).exec().catch(e => { throw e })

            res.status(200).json({ error: false, message: "Ok" })
        } catch (e) {
            console.log(e)
            res.status(200).json({ error: true, message: e.message })
        }
    }
}

export default notificationsController
