// import posts from "./tuits.js";
import * as managerDao from "./manager-dao.js";
const ManagerController = (app) => {
	const findAllManagers = async (req, res) => {
		const managers = await managerDao.findAllManagers();
		res.json(managers);
	};

	const findUserById = async (req, res) => {
		const userId = req.params.id;
		const user = await managerDao.findUserById(userId);
		// console.log(user);
		res.json(user);
	};

	const findUserByUsername = async (req, res) => {
		const userName = req.params.username;
		const user = await managerDao.findUserByUsername(userName);
		// console.log(user);
		res.json(user);
	};

	const createUser = async (req, res) => {
		const status = await managerDao.createUser(req.body);
		res.json(status);
	};

	const updateUser = async (req, res) => {
		const userIdToUpdate = req.params.id;
		const status = await managerDao.updateUser(userIdToUpdate, req.body);
		if (
			req.session["currentUser"] &&
			req.session["currentUser"]._id === userIdToUpdate
		) {
			req.session["currentUser"] = req.body;
		}
		req.session.save();
		res.json(status);
	};

	const login = async (req, res) => {
		const user = req.body;
		// console.log(user);
		const foundUser = await managerDao.findUserByCredentials(
			user.username,
			user.password
		);
		// console.log(foundUser);
		if (foundUser) {
			req.session["currentUser"] = foundUser;
			res.json(foundUser);
		} else {
			res.sendStatus(404);
		}
	};

	const logout = async (req, res) => {
		req.session.destroy();
		res.sendStatus(200);
	};

	const profile = async (req, res) => {
		const currentUser = req.session["currentUser"];
		if (currentUser) {
			res.send(currentUser);
		} else {
			res.sendStatus(404);
		}
	};

	const register = async (req, res) => {
		const user = req.body;
		const foundUser = await managerDao.findUserByUsername(user.username);
		console.log(user);
		if (foundUser) {
			res.sendStatus(409);
		} else {
			const newUser = await managerDao.createUser(user);
			req.session["currentUser"] = newUser;
			res.json(newUser);
		}
	};

	const deleteUserByUsername = async (req, res) => {
		const id = req.params.id;
		// const user = managers.find((user) => user.id === id);
		// const index = managers.indexOf(user);
		// managers.splice(index, 1);
		const status = await managerDao.deleteUser(id);
		res.json(status);
	};

	app.post("/api/managers/login", login);
	app.post("/api/managers/logout", logout);
	app.get("/api/managers/profile", profile);
	app.post("/api/managers/register", register);
	app.get("/api/managers", findAllManagers);
	app.get("/api/managers/:username", findUserByUsername);
	app.get("/api/managers/:id", findUserById);
	app.delete("/api/managers/:username", deleteUserByUsername);
	app.post("/api/managers", createUser);
	app.put("/api/managers/:id", updateUser);
};

export default ManagerController;
