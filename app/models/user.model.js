import bcrypt from "bcrypt";

const userModel = (mongoose) => {
  const schema = new mongoose.Schema({
    nama: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    phone: String,
  },
  {
    timestamps: true
  });

  schema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

  schema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

  return mongoose.model('User', schema);
}


export default userModel;