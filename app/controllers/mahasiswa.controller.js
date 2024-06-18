import db from "../models/index.js";
const Mahasiswa = db.mahasiswa;

export const create = (req, res) => {
  req.body.tanggal_lahir = new Date(req.body.tanggal_lahir);

  Mahasiswa.create(req.body)
    .then(() => res.send({messages: 'Data Berhasil Disimpan'}))
    .catch(err => res.status(500).send({messages: err.message}));
}

export const findAll = (req, res) => {
  Mahasiswa.find()
    .then(data => res.send(data))
    .catch(err => res.status(500).send({messages: err.message}));
}

export const findOne = (req, res) => {
  const id = req.params.id;

  Mahasiswa.findById(id)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({messages: err.message}));
}

export const update = (req, res) => {
  const id = req.params.id;
  req.body.tanggal_lahir = new Date(req.body.tanggal_lahir);

  Mahasiswa.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
    .then(data => {
      if(!data) {
        res.status(404).send({messages: 'Tidak dapat mengupdate data'})
      }
      res.send({messages: "Data berhasil diupdate"})
    })
    .catch(err => res.status(500).send({messages: err.message}));
}

export const remove = (req, res) => {
  const id = req.params.id;

  Mahasiswa.findByIdAndDelete(id)
    .then(data => {
      if(!data){
        res.status(404).send({messages: 'Data berhasil dihapus'})
      }
      })
    .catch(err => res.status(500).send({messages: err.message}));
}