import db from "../models/index.js";
const Jadwal = db.jadwal;
const Lapangan = db.lapangan;


export const getJadwal = async (req, res) => {
  try {
    const data = await Jadwal.find().populate('lapangan');
    res.send(data);
  } catch (error) {
    res.status(500).send({messages: error.message});
  }
}

export const create = async (req, res) => {
  try {
    const {
      lapanganId,
      date,
      startTime,
      endTime,
    } = req.body;

    const lapangan = await Lapangan.findById(lapanganId);
    if(!lapangan) {
      return res.status(404).send({message: 'Lapangan Tidak Ditemukan'});
    }

    const existingJadwal = await Jadwal.findOne({
      lapangan: lapanganId,
      date: new Date(date),
      $or: [
        {
          $and: [
            { startTime: { $lte: startTime } },
            { endTime: { $gte: startTime } }
          ]
        },
        {
          $and: [
            { startTime: { $lte: endTime } },
            { endTime: { $gte: endTime } }
          ]
        },
        {
          $and: [
            { startTime: { $gte: startTime } },
            { endTime: { $lte: endTime } }
          ]
        }
      ]
    });

    if(existingJadwal) {
      return res.status(400).send({message: 'Jadwal sudah ada untuk waktu tersebut'});
    }

    const newJadwal = new Jadwal({
      lapangan: lapanganId,
      date,
      startTime,
      endTime,
    });

    const data = await newJadwal.save();
    res.send({messages: 'Data Berhasil Disimpan', data});
  } catch (error) {
    res.status(500).send({messages: error.message});
  }

  }

  export const getJadwalByLapangan = async (req, res) => {
    const {lapanganId} = req.params;
    try {
      const jadwal = await Jadwal.find({lapangan: lapanganId}).populate('lapangan');
      res.send(jadwal);
    } catch (error) {
      res.status(500).send({message: error.message});
    }
  }

  export const deleteJadwal = async (req, res) => {
    const id = req.params.id;
    try {
      const data = await Jadwal.findByIdAndDelete(id);
      if(!data || null){
        res.status(404).send({messages: 'Data tidak ditemukan'})
      }else {
        res.send({messages: 'Data berhasil dihapus'});
      }
    } catch (error) {
      res.status(500).send({message: error.message});
    }
  }