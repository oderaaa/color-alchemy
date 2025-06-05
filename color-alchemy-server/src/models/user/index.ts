// models/User.ts

import mongoose, { Document, Schema } from "mongoose";
import { UserType } from "./types";
import bcrypt from "bcrypt";

const UserSchema: Schema<UserType> = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
      match: /^[a-zA-Z0-9_-]+$/,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/,
    },
    password: { type: String, required: true },
    stats: {
      wins: { type: Number, default: 0 },
      losses: { type: Number, default: 0 },
    },
    role: { type: String, enum: ["user", "admin", "guest"], default: "user" },
  },
  { timestamps: true }
);

// Pre-save hook to hash the password before saving
UserSchema.pre<UserType>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to match password
UserSchema.methods.matchPassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

// Create the User model
const UserModel = mongoose.model<UserType>("User", UserSchema);

export default UserModel;
