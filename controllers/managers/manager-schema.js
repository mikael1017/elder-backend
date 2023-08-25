import mongoose from "mongoose";

const managerSchema = mongoose.Schema(
	{
		username: String,
		password: String,
		name: String,
		email: String,
		city: String,
		phoneNumber: String,
		role: String,
		elderManaging: [String],
		profileImage: String,
	},
	{ collection: "managerInfo" }
);

export default managerSchema;
