import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true, default: "New User" },
  email: { type: String, unique: true, required: true },
  phone: { type: String, default: "" },
});

export const User = model("User", UserSchema);
export default User;
