import dbconfig from "../config/database.js";
import mongoose from "mongoose";
import mahasiswaModel from "./mahasiswa.model.js";

const db = {
  mongoose,
  url: dbconfig.url,
  mahasiswa: mahasiswaModel(mongoose)
};

export default db;