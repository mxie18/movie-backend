import mongoose from "mongoose";
import movieSchema from "./schema.js";
const movieModel = mongoose.model("MovieModel", movieSchema);
export default movieModel;
