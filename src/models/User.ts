import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a name"],
    },
    email: {
        type: String,
        required: [true, "Please enter a valid email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter a valid password"],
        select: false, //This is done to ensure password is not returned by default
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
        type: String,
        enum: ["ADMIN", "USER"],
        default: "USER",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    forgotPasswordToken: {
        type: String,
        default: "",
    },
    forgotPasswordExpiry: {
        type: Date,
        default: Date.now,
    },
    verificationToken: {
      type: String,
      default: "",
    },
    verificationExpiry: {
        type: Date,
        default: Date.now,
    }
});

//update the timestamps on save
userSchema.pre("save", async function (next) {
    this.updatedAt = new Date();
    next();
})

const User  = mongoose.models.User || mongoose.model('User', userSchema);

export default User;