import express from "express";
import {getJadwal, getJadwalByLapangan, create, deleteJadwal} from "../../controllers/jadwal.controller.js";
import verifyToken from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get('/',verifyToken, getJadwal);
router.get('/:lapanganId', verifyToken, getJadwalByLapangan);
router.post('/',verifyToken, create);
router.delete('/:id', verifyToken, deleteJadwal);

export default router;