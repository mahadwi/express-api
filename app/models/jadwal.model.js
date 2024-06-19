const jadwalSchema = (mongoose) => {
  const schema = new mongoose.Schema({
    lapangan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lapangan',
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    },
    isBooked: {
      type: Boolean,
      default: false
    },
    // namaPemesan: {
    //   type: String,
    //   required: true
    // },
    // kontakPemesan: {
    //   type: Number,
    //   required: true
    // },
    // catatan: String
  });

  return mongoose.model('Jadwal', schema);
}

export default jadwalSchema;

