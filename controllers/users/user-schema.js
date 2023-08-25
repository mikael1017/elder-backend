import mongoose from "mongoose";

const userSchema = mongoose.Schema(
	{
		username: String,
		password: String,
		name: String,
		email: String,
		city: String,
		phoneNumber: String,
		manager: String,
		isAdmin: { type: Boolean, default: false },
		role: {
			type: String,
			default: "elder",
			enum: ["elder", "manager"],
		},
		profileImage: String,
	},
	{ collection: "userInfo" }
);

export default userSchema;
