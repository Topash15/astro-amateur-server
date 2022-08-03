import express from "express";
import controller from "../controllers/articles";

const router = express.Router();

router.get("/get/articles", controller.getAllArticles);
router.get("/get/article/:id", controller.getArticleById);
router.post("/post/articles", controller.createArticle);
router.delete("/delete/article/:id", controller.deleteArticleById);
router.put("/put/article/:id", controller.updateArticleById);

export default router;
