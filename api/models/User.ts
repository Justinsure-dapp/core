import { Schema, model } from "mongoose";
import { User } from "../types/custom";

const userSchema = new Schema<User>({
  address: { type: String, unique: true, required: true },
  name: { type: String },
  image: { type: String },
  policiesOwned: {
    type: [{
      address: { type: String },
      premium: { type: Number },
      claimValue: { type: Number },
      claimExpiry: { type: Date },
      status: { type: String, enum: ["Ongoing", "Claim Requested", "Claimed", "Expired"], default: "Ongoing" },
    }],
    default: [],
  },
  marketer: {
    type: {
      name: { type: String },
      image: { type: String },
    },
  },
});

export default model<User>("User", userSchema);