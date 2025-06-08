import express from 'express';
import upload from '../helpers/multer.js';
import { createItemController, getAllItemsController, getItemController, deleteItemController, updatePriceController, addSizeController, updateSizeController, deleteSizeController, getSizesController } from '../controllers/itemController.js';

const router = express.Router()

router.post('/create', upload.single('picture'), createItemController)
router.get('/all', getAllItemsController)
router.get('/items/:id', getItemController)
router.delete('/items/:id', deleteItemController)
router.put('/items/:id', updatePriceController)
router.post('/sizes/:id', addSizeController)
router.put('/sizes/:id', updateSizeController)
router.delete('/sizes/:id', deleteSizeController)
router.get('/sizes/:id', getSizesController)


export default router