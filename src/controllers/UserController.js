//Environment variables
require("dotenv").config({ path: "./.env.local" });

const User = require("../models/User");
const fs = require("fs");
const DIR = "./";

module.exports = class UserController {
	//New User Create
	static createUser = async (req, res) => {
		let payload = req.body;

		//Image check if have then include image into payload
		let imgUrl = "";
		if (req.file) imgUrl = `storage/profile-pictures/${req.file.filename}`;
		payload.profile_picture = imgUrl;

		try {
			const userCreate = await new User(payload).save();
			return res.status(200).json({
				code: 200,
				message: "User Create Successfully",
				data: userCreate,
			});
		} catch (error) {
			res.status(501).json({
				code: 501,
				message: error.message,
				error: true,
			});
		}
	};

	//Single User Information
	static singleUser = async (req, res) => {
		const id = req.params.id;

		try {
			const singleUserInfo = await User.findById(id);
			const { profile_picture } = singleUserInfo;
			let getImageName = profile_picture.match(/\/([^\/?#]+)[^\/]*$/);

			//return console.log(getImageName);
			singleUserInfo.profile_picture = `${process.env.LINK_SERVICE_URL}/user/${getImageName[1]}`;

			return res.status(200).json({
				code: 200,
				message: "Single User Information",
				data: singleUserInfo,
			});
			//return console.log(singleUserInfo)
		} catch (error) {
			res.status(501).json({
				code: 501,
				message: error.message,
				error: true,
			});
		}
	};

	//All User information
	static allUser = async (req, res) => {
		try {
			const allUserInfo = await User.find();

			//return console.log(singleUserInfo);
			return res.status(200).json({
				code: 200,
				message: "All User Information",
				data: allUserInfo,
			});
			//return console.log(singleUserInfo)
		} catch (error) {
			res.status(501).json({
				code: 501,
				message: error.message,
				error: true,
			});
		}
	};

	//User Update by User Id
	static updateUser = async (req, res) => {
		const id = req.params.id;
		let reqBody = req.body;

		//If File have then push file into reqBody then process update
		let imgUrl = "";
		if (req.file) imgUrl = `storage/profile-pictures/${req.file.filename}`;
		reqBody.profile_picture = imgUrl;

		try {
			//Check user have profile_picture/image. if had then first delete local file then database
			const userInfo = await User.findById(id);
			const userprofile_pictureInfo = userInfo.profile_picture;
			if (userprofile_pictureInfo) {
				fs.unlinkSync(DIR + userprofile_pictureInfo);
			}

			const updateItem = await User.findOneAndUpdate(
				{ _id: id },
				reqBody
			);
			return res.status(200).json({
				code: 200,
				message: "User Update Information Successfully",
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

	//User Delete By User Id
	static deleteUser = async (req, res) => {
		const id = req.params.id;
		//return console.log(id)
		try {
			const userDeleteinfo = await User.findOneAndDelete({ _id: id });
			const { profile_picture } = userDeleteinfo;

			if (profile_picture) {
				fs.unlinkSync(DIR + profile_picture);
			}

			//const userDelete = await User.deleteOne({_id: id});
			return res.status(200).json({
				code: 200,
				message: "User Delete Successfully",
				data: userDeleteinfo,
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
