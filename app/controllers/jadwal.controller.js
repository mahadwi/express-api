import db from "../models/index.js";
const Jadwal = db.jadwal;

export const findAll = async (req, res) => {
  try {
    const data = await Jadwal.find();
    res.send(data);
  } catch (error) {
    res.status(500).send({messages: error.message});
  }
}

export const create = async (req, res) => {
  try {
    const {
      lapangan,
      date,
      startTime,
      endTime,
      namaPemesan,
      kontakPemesan,
      catatan
    } = req.body;

    const newJadwal = new Jadwal({
      lapangan,
      date,
      startTime,
      endTime,
      namaPemesan,
      kontakPemesan,
      catatan
    });

    const data = await newJadwal.save();
    res.send({messages: 'Data Berhasil Disimpan', data});
  } catch (error) {
    res.status(500).send({messages: error.message});
  }
}