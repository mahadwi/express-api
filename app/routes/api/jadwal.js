import express from "express";
import {findAll, create} from "../../controllers/jadwal.controller.js";
import verifyToken from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get('/',verifyToken, findAll);
router.post('/',verifyToken, create);

export default router;