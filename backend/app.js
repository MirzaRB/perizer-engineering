var express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("express");
let cors = require("cors");
dotenv.config();

//routes import
const userRouter = require("./routes/user");

const app = express();

app.use(bodyParser.json({ limit: "20mb" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//routes
app.use("/api", userRouter);

//server configs
const port = process.env.PORT;
app.listen(port, () => console.log("Server running sucessfully on port", port));
