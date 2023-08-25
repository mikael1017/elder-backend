// import posts from "./tuits.js";
import * as EldersDao from "./elder-dao.js";
const ElderController = (app) => {
	const findAllElders = async (req, res) => {
		const Elders = await EldersDao.findAllElders();
		res.json(Elders);
	};

	const findElderById = async (req, res) => {
		const userId = req.params.id;
		const user = await EldersDao.findElderById(userId);
		// console.log(user);
		res.json(user);
	};

	const findElderByUsername = async (req, res) => {
		const userName = req.params.username;
		const user = await EldersDao.findElderByUsername(userName);
		// console.log(user);
		res.json(user);
	};

	const createElder = async (req, res) => {
		const status = await EldersDao.createElder(req.body);
		res.json(status);
	};

	const updateElder = async (req, res) => {
		const userIdToUpdate = req.params.id;
		const status = await EldersDao.updateElder(userIdToUpdate, req.body);
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
		const foundUser = await EldersDao.findElderByCredentials(
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
		const foundUser = await EldersDao.findElderByUsername(user.username);
		console.log(user);
		if (foundUser) {
			res.sendStatus(409);
		} else {
			const newUser = await EldersDao.createElder(user);
			req.session["currentUser"] = newUser;
			res.json(newUser);
		}
	};

	const deleteElderByUsername = async (req, res) => {
		const id = req.params.id;
		// const user = Elders.find((user) => user.id === id);
		// const index = Elders.indexOf(user);
		// Elders.splice(index, 1);
		const status = await EldersDao.deleteElder(id);
		res.json(status);
	};

	app.post("/api/elders/login", login);
	app.post("/api/elders/logout", logout);
	app.get("/api/elders/profile", profile);
	app.post("/api/elders/register", register);

	app.get("/api/elders", findAllElders);
	app.get("/api/elders/:username", findElderByUsername);
	app.get("/api/elders/:id", findElderById);
	app.delete("/api/elders/:username", deleteElderByUsername);
	app.post("/api/elders", createElder);
	app.put("/api/elders/:id", updateElder);
};

export default ElderController;
