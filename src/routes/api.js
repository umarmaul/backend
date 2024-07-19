const express = require("express");
const UserController = require("../controllers/UserController");
const EventController = require("../controllers/EventController");
const fileUpload = require("../utils/fileUpload");
const router = express.Router();

// user api
router.post(
	"/create-user",
	fileUpload("./storage/profile-pictures"),
	UserController.createUser
);
router.get("/all-user", UserController.allUser);
router.get("/single-user/:id", UserController.singleUser);
router.post(
	"/update-user/:id",
	fileUpload("./storage/profile-pictures"),
	UserController.updateUser
);
router.delete("/delete-user/:id", UserController.deleteUser);

// event api
router.post(
	"/create-event",
	fileUpload("./storage/event-pictures"),
	EventController.createEvent
);
router.get("/all-event", EventController.allEvent);
router.get("/single-event/:id", EventController.singleEvent);
router.post(
	"/update-event/:id",
	fileUpload("./storage/event-pictures"),
	EventController.updateEvent
);
router.delete("/delete-event/:id", EventController.deleteEvent);

module.exports = router;
