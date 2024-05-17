const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Email can't be blank"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Email can't be blank"],
      unique: true,
      trim: true,
    },
    password: String,
    address: {
      street: String,
      city: String,
      state: String,
      pinCode: String,
      country: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
