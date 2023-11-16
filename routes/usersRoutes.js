import { Router } from "express";
import usersController from "../controllers/usersController.js";
import jwtCheck from "../middlewares/jwtCheck.js";

const usersRouter = Router();

usersRouter.get("/", jwtCheck, (req, res) => usersController.getAllUsers(req, res))
usersRouter.post("/createUser",jwtCheck,  (req, res) => usersController.createUser(req, res))
usersRouter.get("/verifyAuth", jwtCheck, (req, res) => usersController.verifyAuth(req, res))
usersRouter.post("/authUser", (req, res) => usersController.authUser(req, res))
usersRouter.get("/logOff", (req, res) => usersController.logOff(req, res))

//routes with params always on bottom
usersRouter.delete("/:userId", jwtCheck, (req, res) => usersController.deleteUser(req, res))
usersRouter.get("/:userId", jwtCheck, (req, res) => usersController.getOneUser(req, res))

export default usersRouter;