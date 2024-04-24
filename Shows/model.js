import mongoose from "mongoose";
import showSchema from "./schema.js";
const showModel = mongoose.model("ShowModel", showSchema);
export default showModel;
