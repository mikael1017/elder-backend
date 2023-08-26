import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import ElderController from "./controllers/elders/elder-controller.js";
import ManagerController from "./controllers/managers/manager-controller.js";
import "dotenv/config";

const CONNECTION_STRING = process.env.MONGODB_API_URL;
mongoose.connect(CONNECTION_STRING);
const app = express();
// make it available to frontend app
// app.use(
// 	cors({
// 		credentials: true,
// 		origin: "https://astonishing-elf-6929de.netlify.app",
// 	})
// );
app.use(express.json());
app.use(
	session({
		secret: "process.env.SECRET",
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false },
		// this needs to be true when we deploy to production
		// otherwise, local
	})
);

if (process.env.ENV === "production") {
	app.set("trust proxy", 1); // trust first proxy
	session.cookie.secure = true; // serve secure cookies
}

ElderController(app);
ManagerController(app);
console.log("Started the server");

app.listen(process.env.PORT || 4000);
