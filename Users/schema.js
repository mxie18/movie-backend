import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: ["USER", "ADMIN"],
            default: "USER",
        },
        moviesLiked: [
            { ref: "MovieModel", type: mongoose.Schema.Types.ObjectId },
        ],
    },
    { collection: "users" }
);
export default UserSchema;
