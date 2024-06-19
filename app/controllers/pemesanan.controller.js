import db from "../models/index.js";
const Pemesanan = db.pemesanan;
const Jadwal = db.jadwal;

export const createPemesanan = async (req, res) => {
  try {
    const {jadwalId, namaPemesan, kontakPemesan, catatan} = req.body;

    const jadwal = await Jadwal.findById(jadwalId);
  console.log(jadwal);
    if(!jadwal) {
      return res.status(400).send({message: 'Jadwal tidak tersedia'});
    }

    jadwal.isBooked = true;
    await jadwal.save();

    const newPemesanan = new Pemesanan({
      user: req.userId,
      jadwal: jadwalId,
      namaPemesan: namaPemesan,
      kontakPemesan: kontakPemesan,
      catatan: catatan
    });

    const data = await newPemesanan.save();
    res.send({message: 'Pemesanan Berhasil', data});
  } catch (error) {
    res.status(500).send({message: error.message});
  }
}

export const getPemesanan = async (req, res) => {
  try {
    const pemesanan = await Pemesanan.find().populate('jadwal').populate('user');
    if(!pemesanan) {
      return res.status(404).send({message: 'Pemesanan tidak ditemukan'});
    }
    res.send(pemesanan);
  } catch (error) {
    res.status(500).send({message: error.message});
  }
}

export const getPemesananById = async (req, res) => {
  try {
    const pemesanan = await Pemesanan.findById(req.params.idPemesanan).populate('jadwal').populate('user');
    if(!pemesanan) {
      return res.status(404).send({message: 'Pemesanan tidak ditemukan'});
    }
    res.send(pemesanan);
  } catch (error) {
    res.status(500).send({message: error.message});
  }
}