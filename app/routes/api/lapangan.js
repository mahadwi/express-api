import express from "express";
import {create, findAll, findOne, remove} from "../../controllers/lapangan.controller.js";
import upload from "../../config/multer.js";
import verifyToken from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get('/', findAll);
router.post('/', verifyToken, upload.single('gambar'), create);
router.get('/:id',verifyToken, findOne);
router.delete('/:id',verifyToken, remove);

export default router;