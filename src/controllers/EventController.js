require("dotenv").config({ path: "./.env.development" });

const Event = require("../models/Event");
const Camera = require("../models/Camera");
const fs = require("fs");
const DIR = "./";

module.exports = class EventController {
	//New Event Create
	static createEvent = async (req, res) => {
		let payload = req.body;

		//Image check if have then include image into payload
		let imgUrl = "";
		if (req.file) imgUrl = `storage/profile-pictures/${req.file.filename}`;
		payload.event_picture = imgUrl;

		try {
			const eventCreate = await new Event(payload).save();
			return res.status(200).json({
				code: 200,
				message: "Event Create Successfully",
				data: eventCreate,
			});
		} catch (error) {
			res.status(501).json({
				code: 501,
				message: error.message,
				error: true,
			});
		}
	};

	//Single Event Information
	static singleEvent = async (req, res) => {
		const id = req.params.id;

		try {
			const singleEventInfo = await Event.findById(id).populate(
				"from_camera"
			);
			const { event_picture } = singleEventInfo;
			let getImageName = event_picture.match(/\/([^\/?#]+)[^\/]*$/);

			//return console.log(getImageName);
			singleEventInfo.event_picture = `${process.env.LINK_SERVICE_URL}/event/${getImageName[1]}`;

			return res.status(200).json({
				code: 200,
				message: "Single Event Information",
				data: singleEventInfo,
			});
			//return console.log(singleEventInfo)
		} catch (error) {
			res.status(501).json({
				code: 501,
				message: error.message,
				error: true,
			});
		}
	};

	//All Event information
	static allEvent = async (req, res) => {
		try {
			const allEventInfo = await Event.find().populate("from_camera");

			return res.status(200).json({
				code: 200,
				message: "All Event Information",
				data: allEventInfo,
			});
			//return console.log(allEventInfo)
		} catch (error) {
			res.status(501).json({
				code: 501,
				message: error.message,
				error: true,
			});
		}
	};

	//Event Update by Event Id
	static updateEvent = async (req, res) => {
		const id = req.params.id;
		let reqBody = req.body;

		//If File have then push file into reqBody then process update
		let imgUrl = "";
		if (req.file) imgUrl = `storage/event-pictures/${req.file.filename}`;
		reqBody.event_picture = imgUrl;

		try {
			//Check Event have event_picture/image. if had then first delete local file then database
			const eventInfo = await Event.findById(id);
			const event_pictureInfo = eventInfo.event_picture;
			if (event_pictureInfo) {
				fs.unlinkSync(DIR + event_pictureInfo);
			}

			const updateItem = await Event.findOneAndUpdate(
				{ _id: id },
				reqBody
			);
			return res.status(200).json({
				code: 200,
				message: "Event Update Information Successfully",
				data: updateItem,
			});
		} catch (error) {
			res.status(501).json({
				code: 501,
				message: error.message,
				error: true,
			});
		}
	};

	//Event Delete By Event Id
	static deleteEvent = async (req, res) => {
		const id = req.params.id;
		//return console.log(id)
		try {
			const eventDeleteinfo = await Event.findOneAndDelete({ _id: id });
			const { event_picture } = eventDeleteinfo;

			if (event_picture) {
				fs.unlinkSync(DIR + event_picture);
			}

			//const eventDelete = await Event.deleteOne({_id: id});
			return res.status(200).json({
				code: 200,
				message: "Event Delete Successfully",
				data: eventDeleteinfo,
			});
		} catch (error) {
			res.status(501).json({
				code: 501,
				message: error.message,
				error: true,
			});
		}
	};
};
