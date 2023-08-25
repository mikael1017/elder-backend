import managerModel from "./manager-model.js";

export const findAllManagers = async () => await managerModel.find();
export const findUserByUsername = async (username) => {
	const user = await managerModel.findOne({ username: username });
	// console.log(user);
	return user;
};
export const findUserById = async (userId) => {
	const user = await managerModel.findOne({ _id: userId });
	return user;
};
export const createUser = async (user) => await managerModel.create(user);
export const updateUser = async (cid, user) =>
	await managerModel.updateOne({ _id: cid }, { $set: user });
export const deleteUser = async (username) => {
	const status = await managerModel.deleteOne({ username: username });
	return status;
};
export const findUserByCredentials = async (username, password) => {
	const user = await managerModel.findOne({ username, password });
	return user;
};
