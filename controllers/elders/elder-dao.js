import elderModel from "./elder-model.js";

export const findAllElders = async () => await elderModel.find();
export const findElderByUsername = async (username) => {
	const Elder = await elderModel.findOne({ username: username });
	// console.log(Elder);
	return Elder;
};
export const findElderById = async (uid) => {
	const Elder = await elderModel.findOne({ _id: uid });
	return Elder;
};
export const createElder = async (elder) => await elderModel.create(elder);
export const updateElder = async (cid, Elder) =>
	await elderModel.updateOne({ _id: cid }, { $set: Elder });
export const deleteElder = async (username) => {
	const status = await elderModel.deleteOne({ username: username });
	return status;
};
export const findElderByCredentials = async (username, password) => {
	const Elder = await elderModel.findOne({ username, password });
	return Elder;
};
