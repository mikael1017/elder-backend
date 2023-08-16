import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

mongoose.connect(
	"mongodb+srv://jaewoo:wodn1017@cs6650.o3m9wao.mongodb.net/tennis?retryWrites=true&w=majority"
);
const app = express();
// make it available to frontend app
app.use(
	cors({
		credentials: true,
		origin: "https://astonishing-elf-6929de.netlify.app",
	})
);
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
ConfirmedMatchController(app);
MatchRequestController(app);
SessionController(app);
UserController(app);
CourtsController(app);
CourtFollowersController(app);
console.log("Started the server");

app.listen(process.env.PORT || 4000);
