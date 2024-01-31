import mongoose from "mongoose";
import bcrypt from "bcrypt";

const accountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 50,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

accountSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword;
  }

  next();
});

const Account = mongoose.model("Account", accountSchema);

export const findAccount = async (email) => {
  return Account.findOne({ email }).exec();
};

// export const verifyAccount = async (foundAccount, password) => {
//   return bcrypt.compare(password, foundAccount.password);
// };

export const isAccountExist = async (name, email) => {
  const nameExist = await Account.findOne({ name }).exec();
  const emailExist = await Account.findOne({ email }).exec();

  if (nameExist || emailExist) {
    return true;
  }
};

export const addAccount = async (name, email, password) => {
  const newAccount = new Account({ name, email, password });
  console.log(newAccount);
  await newAccount.save();
};
