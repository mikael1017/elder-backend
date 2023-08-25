import mongoose from "mongoose";

const elderSchema = mongoose.Schema(
	{
		username: String,
		password: String,
		name: String,
		email: String,
		city: String,
		phoneNumber: String,
		role: String,
		manager: String,
		medicalCondition: String,
		emergencyContact: String,
		profileImage: String,
	},
	{ collection: "elderInfo" }
);

export default elderSchema;
