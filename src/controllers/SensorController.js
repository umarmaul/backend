require("dotenv").config({ path: "./.env.development" });

const Sensor = require("../models/Sensor");

module.exports = class SensorController {
    //New Event Create
    static createSensor = async (req, res) => {
        let payload = req.body;
        console.log(payload);

        try {
            const dataCreate = await new Sensor(payload).save();
            return res.status(200).json({
                code: 200,
                message: "Sensor created successfully",
                data: dataCreate,
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
