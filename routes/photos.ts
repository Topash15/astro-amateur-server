import express from 'express';
import controller from '../controllers/photos';

const router = express.Router();

router.get('/get/photos', controller.getAllPhotos);
router.get('/get/photo/:id', controller.getPhotoById);
router.post('/post/photos', controller.createPhoto);
router.delete('/delete/photo/:id', controller.deletePhotoById);
router.put("/put/photo/:id", controller.updatePhotoById);

export default router;