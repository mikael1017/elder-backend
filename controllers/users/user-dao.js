import userModel from "./user-model.js";

export const findAllUsers = async () => await userModel.find();
export const findUserByUsername = async (username) => {
	const user = await userModel.findOne({ username: username });
	// console.log(user);
	return user;
};
export const findUserById = async (userId) => {
	const user = await userModel.findOne({ _id: userId });
	return user;
};
export const createUser = async (user) => await userModel.create(user);
export const updateUser = async (cid, user) =>
	await userModel.updateOne({ _id: cid }, { $set: user });
export const deleteUser = async (username) => {
	const status = await userModel.deleteOne({ username: username });
	return status;
};
export const findUserByCredentials = async (username, password) => {
	const user = await userModel.findOne({ username, password });
	return user;
};
