//Environment Variable
require("dotenv").config({ path: "./.env.development" });

//Import Library
const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//Import Routes
const router = require("./src/routes/api");

//Initialize App
const app = express();
app.use(bodyParser.json());

//Database Connection
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("Database Connected"))
	.catch((err) => console.log(err));

//Storage
app.use("/user", express.static("storage/images"));

//Base Routes
app.use("/api/v1", router);

//Error Handling
app.use((err, req, res, next) => {
	if (err instanceof multer.MulterError) {
		// Multer-specific errors
		return res.status(418).json({
			err_code: err.code,
			err_message: err.message,
		});
	} else {
		// Handling errors for any other cases from whole application
		return res.status(500).json({
			err_code: 409,
			err_message: "Something went wrong!",
		});
	}
});

//Undefined Route Implement
app.use("*", (req, res) => {
	res.status(404).json({ status: "fail", data: "Not Found" });
});

module.exports = app;
