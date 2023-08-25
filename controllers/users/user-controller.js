// import posts from "./tuits.js";
import * as usersDao from "../users/user-dao.js";
const UserController = (app) => {
	const findAllUsers = async (req, res) => {
		const users = await usersDao.findAllUsers();
		res.json(users);
	};

	const findUserById = async (req, res) => {
		const userId = req.params.id;
		const user = await usersDao.findUserById(userId);
		// console.log(user);
		res.json(user);
	};

	const findUserByUsername = async (req, res) => {
		const userName = req.params.username;
		const user = await usersDao.findUserByUsername(userName);
		// console.log(user);
		res.json(user);
	};

	const createUser = async (req, res) => {
		const status = await usersDao.createUser(req.body);
		res.json(status);
	};

	const updateUser = async (req, res) => {
		const userIdToUpdate = req.params.id;
		const status = await usersDao.updateUser(userIdToUpdate, req.body);
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
		const foundUser = await usersDao.findUserByCredentials(
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
		const foundUser = await usersDao.findUserByUsername(user.username);
		console.log(user);
		if (foundUser) {
			res.sendStatus(409);
		} else {
			const newUser = await usersDao.createUser(user);
			req.session["currentUser"] = newUser;
			res.json(newUser);
		}
	};

	const deleteUserByUsername = async (req, res) => {
		const id = req.params.id;
		// const user = users.find((user) => user.id === id);
		// const index = users.indexOf(user);
		// users.splice(index, 1);
		const status = await usersDao.deleteUser(id);
		res.json(status);
	};

	app.post("/api/users/login", login);
	app.post("/api/users/logout", logout);
	app.get("/api/users/profile", profile);
	app.post("/api/users/register", register);

	app.get("/api/users", findAllUsers);
	app.get("/api/users/:username", findUserByUsername);
	app.get("/api/users/:id", findUserById);
	app.delete("/api/users/:username", deleteUserByUsername);
	app.post("/api/users", createUser);
	app.put("/api/users/:id", updateUser);
};

export default UserController;
