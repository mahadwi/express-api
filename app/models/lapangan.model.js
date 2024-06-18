const lapanganModel = (mongoose) => {
  const schema = new mongoose.Schema({
    namaLapangan: {
      type: String,
      required: true
    },
    lokasiLapangan: {
      type: String,
      required: true
    },
    tipeLapangan: {
      type: String,
      enum: ['Synthetic', 'Natural', 'Indoor', 'Outdoor'],
      required: true
    },
    ukuranLapangan: Number,
    kapasitasLapangan: Number,
    gambar: {
      type: String,
    },
    deskripsi: {
      type: String
    },
    hargaPerSesi: {
      type: Number,
      required: true
    },
  },
  {
    timestamps: true
  });

  schema.method("toJSON", function(){
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;

    return object;
  });

  return mongoose.model('Lapangan', schema);
}

export default lapanganModel;