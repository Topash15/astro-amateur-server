import express from 'express';
import controller from '../controllers/tags';

const router = express.Router();

router.get('/get/tags', controller.getAllTags);
router.get('/get/tag/:id', controller.getTagById);
router.post('/post/tags', controller.createTag);
router.delete('/delete/tag/:id', controller.deleteTagById);

export default router;