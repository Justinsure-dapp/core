import { Schema, model } from "mongoose";
import { User } from "../types/custom";

const userSchema = new Schema<User>({
  address: { type: String, unique: true, required: true },
  name: { type: String },
  image: { type: String },
  marketer: {
    type: {
      name: { type: String },
      image: { type: String },
      policiesCreated: [String],
    },
  },
});

export default model<User>("User", userSchema);
