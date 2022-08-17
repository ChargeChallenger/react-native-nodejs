const express = require("express");
const mysql = require("mysql");
const app = express();
const port = 8000;

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	database: "test",
	password: "",
	port: "3306",
	//connectTimeout: 500,
});

app.use(function (req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET");
	res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type");
	res.setHeader("Access-Control-Allow-Credentials", true);
	next();
});

app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);
app.get("/", (req, res) => {
	connection.connect(function (err) {
		if (err) {
			return console.error("Ошибка: " + err.message);
		} else {
			console.log("Подключение к серверу MySQL успешно установлено");
			connection.query("SELECT * FROM newuser", function (err, result) {
				if (err) throw err;
				res.json(result);
			});
		}
	});
	connection.destroy();
});

app.listen(port, () => {
	console.log("work on " + port);
});
