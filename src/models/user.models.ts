import { UserInterface } from "@/interfaces/user.interface";
import { Document, Schema, model } from "mongoose";

const UserSchema = new Schema<UserInterface>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const UserModel = model<UserInterface & Document>("User", UserSchema);
