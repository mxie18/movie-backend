import mongoose from "mongoose";
const showSchema = new mongoose.Schema(
    {
        name: String,
        showId: String,
        likedBy: [{ ref: "UserModel", type: mongoose.Schema.Types.ObjectId }],
    },
    { collection: "shows" }
);
export default showSchema;
