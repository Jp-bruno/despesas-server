import { Router } from "express";
import notificationsController from "../controllers/notificationsController.js";


const notificationRouter = Router()

notificationRouter.post("/createNotification", (req, res) => notificationsController.createNotification)
notificationRouter.post("/getUserNotifications", (req, res) => notificationsController.getUserNotifications)
notificationRouter.post("/setNotificationReadState", (req, res) => notificationsController.setNotificationReadState)

export default notificationRouter