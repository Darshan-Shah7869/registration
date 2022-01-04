import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, "Please enter the first name"],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "Please enter the last name"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Please enter your email"],
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Please enter your password"],
      min: 6,
      max: 64,
    },
    contact: {
      type: String,
      trim: true,
      required: [true, "Please enter your contact number"],
    },
    address: {
      type: String,
      trim: true,
      required: [true, "Please enter your address"],
      max: 1000,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
