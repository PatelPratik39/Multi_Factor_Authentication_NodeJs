import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      unique: true
    },
    isMfaActive: {
      type: Boolean,
      required: false
    },
    twoFactorSecret: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", UserSchema);

export default User;