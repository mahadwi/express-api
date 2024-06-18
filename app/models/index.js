import dbconfig from "../config/database.js";
import mongoose from "mongoose";
import mahasiswaModel from "./mahasiswa.model.js";
import lapanganModel from "./lapangan.model.js";
import jadwalModel from "./jadwal.model.js";
import pemesananModel from "./pemesanan.model.js";
import userModel from "./user.model.js";

const db = {
  mongoose,
  url: dbconfig.url,
  mahasiswa: mahasiswaModel(mongoose),
  lapangan: lapanganModel(mongoose),
  jadwal: jadwalModel(mongoose),
  pemesanan: pemesananModel(mongoose),
  user: userModel(mongoose)
};

export default db;