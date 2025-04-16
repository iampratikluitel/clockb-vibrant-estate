import { Schema, model, models, Model } from "mongoose";

const userTypes = ["admin", "superadmin"];

const Userschema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    userType: {
      type: String,
      enum: userTypes,
      default: "admin",
    },
    status: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  },
  { strict: false }
);

let User: Model<any>;
try {
  User = models.User || model("User", Userschema, "User");
} catch (error) {
  User = model("User", Userschema, "User");
}

export default User;
