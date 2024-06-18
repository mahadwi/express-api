import db from "../models/index.js";
const Lapangan = db.lapangan;

export const findAll = async (req, res) => {
  try {
    const data = await Lapangan.find();
    res.send(data);
  } catch (error) {
    res.status(500).send({messages: error.message});
  }
}

export const create = async (req, res) => {
  try {
    const {
      namaLapangan,
      lokasiLapangan,
      tipeLapangan,
      ukuranLapangan,
      kapasitasLapangan,
      deskripsi,
      hargaPerSesi
    } = req.body;

    const gambar = req.file ? req.file.path.replace('public', '') : null;

    const newLapangan = new Lapangan(
      {
        namaLapangan,
        lokasiLapangan,
        tipeLapangan,
        ukuranLapangan,
        kapasitasLapangan,
        gambar,
        deskripsi,
        hargaPerSesi
      }
    );

    const data = await newLapangan.save();
    res.send({ messages: 'Data Berhasil Disimpan', data });
  } catch (error) {
    res.status(500).send({messages: error.message});
  }
}

export const findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Lapangan.findById(id);
    res.send(data);
  } catch (error) {
    res.status(500).send({messages: error.message});
  }

}

export const remove = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Lapangan.findByIdAndDelete(id);
    if(!data || null){
      res.status(404).send({messages: 'Data tidak ditemukan'})
    }else {
      res.send({messages: 'Data berhasil dihapus'});
    }
  } catch (error) {
    res.status(500).send({message: error.message});
  }
}