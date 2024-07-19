const express = require("express");
const UserController = require("../controllers/UserController");
const EventController = require("../controllers/EventController");
const profilePictureUpload = require("../utils/profilePictureUpload");
const eventPictureUpload = require("../utils/eventPictureUpload");

const router = express.Router();

// user api
router.post(
	"/create-user",
	profilePictureUpload("./storage/profile-pictures"),
	UserController.createUser
);
router.get("/all-user", UserController.allUser);
router.get("/single-user/:id", UserController.singleUser);
router.post(
	"/update-user/:id",
	profilePictureUpload("./storage/profile-pictures"),
	UserController.updateUser
);
router.delete("/delete-user/:id", UserController.deleteUser);

// event api
router.post(
	"/create-event",
	eventPictureUpload("./storage/event-pictures"),
	EventController.createEvent
);
router.get("/all-event", EventController.allEvent);
router.get("/single-event/:id", EventController.singleEvent);
router.post(
	"/update-event/:id",
	eventPictureUpload("./storage/event-pictures"),
	EventController.updateEvent
);
router.delete("/delete-event/:id", EventController.deleteEvent);

module.exports = router;
