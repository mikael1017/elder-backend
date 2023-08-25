import mongoose from "mongoose";
import managerSchema from "./manager-schema.js";

const managerModel = mongoose.model("ManagerModel", managerSchema);

export default managerModel;
