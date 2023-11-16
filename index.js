import express, { json, urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDatabase from "./database/connect.js";
import usersRouter from "./routes/usersRoutes.js";
import notificationRouter from "./routes/notificationsRoutes.js";
import expensesRouter from "./routes/expensesRoutes.js";

const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
}

app.use(json())

app.use(urlencoded({ extended: true }))

app.use(cors(corsOptions))

app.use(cookieParser(process.env.CK_SECRET))

connectToDatabase()

app.use("/users", usersRouter)
app.use("/notifications", notificationRouter)
app.use("/expenses", expensesRouter)

app.listen(4000, () => {
    console.log("App on")
})



