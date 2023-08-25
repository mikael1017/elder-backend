import mongoose from "mongoose";
import elderSchema from "./elder-schema.js";

const elderModel = mongoose.model("ElderModel", elderSchema);

export default elderModel;
