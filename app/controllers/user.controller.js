import db from "../models/index.js";
const User = db.user;

export const create = async (req, res) => {
  try {
    const {nama, email, password, phone} = req.body;
    const newUser = new User({nama, email, password, phone});

    const data = await newUser.save();
    res.send({message: 'Data Berhasil Disimpan', data});
  } catch (error) {
    res.status(500).send({messages: error.message});
  }
}