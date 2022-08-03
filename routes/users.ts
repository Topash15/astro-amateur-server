import express from "express";
import controller from "../controllers/users";

const router = express.Router();

router.post("/post/user", controller.createUser);
router.get("/get/users", controller.getAllUsers);
router.get("/get/user", controller.getUserByEmail);
router.put("/login", controller.login);
router.post("/logout", controller.logout);

export default router;
