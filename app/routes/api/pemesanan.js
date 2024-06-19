import express from "express";
import {createPemesanan, getPemesanan, getPemesananById} from "../../controllers/pemesanan.controller.js";
import verifyToken from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get('/', verifyToken, getPemesanan);
router.post('/', verifyToken, createPemesanan);
router.get('/:idPemesanan', verifyToken, getPemesananById);

export default router;

