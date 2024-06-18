import express from "express";
import mahasiswaRoute from "./mahasiswa.js";
import lapanganRoute from "./lapangan.js";
import jadwalRoute from "./jadwal.js";
import authRoute from "./auth.js";
import userRoute from "./user.js";

const router = express.Router();

router.use('/mahasiswa', mahasiswaRoute);
router.use('/lapangan', lapanganRoute);
router.use('/jadwal', jadwalRoute);
router.use('/login', authRoute);
router.use('/register', userRoute);

export default router;

