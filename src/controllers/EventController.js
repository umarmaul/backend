require("dotenv").config({ path: "./.env.local" });

const Event = require("../models/Event");
const fs = require("fs");
const DIR = "./";

module.exports = class EventController {
	//New Event Create
	static createEvent = async (req, res) => {
		let payload = req.body;

		//Image check if have then include image into payload
		let imgUrl = "";
		if (req.file) imgUrl = `storage/profile-pictures/${req.file.filename}`;
		payload.profile_picture = imgUrl;

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
			const singleEventInfo = await Event.findById(id);
			const {
				event_level,
				event_type,
				event_picture,
				description,
				from_camera,
				status,
			} = singleEventInfo;
			let getImageName = event_picture.match(/\/([^\/?#]+)[^\/]*$/);

			//return console.log(getImageName);

			const singleEventData = {
				event_level,
				event_type,
				event_picture: `${process.env.LINK_SERVICE_URL}/event/${getImageName[1]}`,
				description,
				from_camera,
				status,
			};

			return res.status(200).json({
				code: 200,
				message: "Single Event Information",
				data: singleEventData,
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
			const allEventInfo = await Event.find();

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
		reqBody.profile_picture = imgUrl;

		try {
			//Check Event have profile_picture/image. if had then first delete local file then database
			const eventInfo = await Event.findById(id);
			const eventprofile_pictureInfo = eventInfo.profile_picture;
			if (eventprofile_pictureInfo) {
				fs.unlinkSync(DIR + eventprofile_pictureInfo);
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
			const { profile_picture } = eventDeleteinfo;

			if (profile_picture) {
				fs.unlinkSync(DIR + profile_picture);
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
