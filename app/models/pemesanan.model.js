const pemesananModel = (mongoose) => {
  const schema = new mongoose.Schema({
    lapangan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lapangan',
      required: true
    },
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
    }
  });

  return mongoose.model('Pemesanan', schema);
}

export default pemesananModel;