require("dotenv").config({ path: "./.env.development" });

const Sensor = require("../models/Sensor");

module.exports = class SensorController {
    //New Event Create
    static createSensor = async (req, res) => {
        let payload = req.body;

        // Check for abnormal values
        if (
            payload.temperature < 0 ||
            payload.temperature > 35 ||
            payload.humidity < 30 ||
            payload.humidity > 70 ||
            payload.AQI < 0 ||
            payload.AQI > 50 ||
            payload.human_presence === true
        ) {
            payload.status = "new";
        } else {
            payload.status = "approved";
        }

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
