//Environment Variable
require("dotenv").config({ path: "./.env.development" });

const app = require("./app");

app.listen(process.env.PORT, function () {
	console.log(`Server is running on port ${process.env.PORT}`);
});
