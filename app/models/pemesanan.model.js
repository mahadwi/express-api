const pemesananModel = (mongoose) => {
  const schema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    jadwal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Jadwal',
      required: true
    },
    bookingDate: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Cancelled'],
      default: 'Pending'
    },
    namaPemesan: {
        type: String,
        required: true
    },
    kontakPemesan: {
      type: Number,
      required: true
    },
    catatan: String
  });

  return mongoose.model('Pemesanan', schema);
}

export default pemesananModel;