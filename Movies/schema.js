import mongoose from "mongoose";
const movieSchema = new mongoose.Schema(
    {
        name: String,
        movieId: String,
        likedBy: [{ ref: "UserModel", type: mongoose.Schema.Types.ObjectId }],
    },
    { collection: "movies" }
);
export default movieSchema;
