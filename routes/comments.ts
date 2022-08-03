import express from "express";
import controller from "../controllers/comments";

const router = express.Router();

router.get("/get/comments", controller.getAllComments);
router.get("/get/comment/:id", controller.getCommentById);
router.get("/get/comments/photo/:id", controller.getCommentsByPhotoId);
router.get("/get/comments/article/:id", controller.getCommentsByArticleId);
router.post("/post/comments", controller.createComment);
router.delete("/delete/comment/:id", controller.deleteCommentById);
router.put("/put/comment/:id", controller.updateCommentById);

export default router;
