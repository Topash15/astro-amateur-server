import express from 'express';
import controller from '../controllers/taglist';

const router = express.Router();

router.get('/get/taglists', controller.getAllTaglists);
router.get('/get/taglist/:id', controller.getTaglistById);
router.post('/post/taglists', controller.createTaglist);
router.delete('/delete/taglist/:id', controller.deleteTaglistById);
router.put('/put/taglist/:id', controller.updateTaglistById);


export default router;