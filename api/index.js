const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const filesRoute = require("./routes/files");
const subsRouter = require("./routes/subs");
const fileUpload = require('express-fileupload');
const cors = require('cors');

//para usar env
dotenv.config();

//Conexión a la base de datos, hosteada con atlas
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Connected to MONGODB");
});

//middleware
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use('/api/files', filesRoute);
app.use("/api/subs", subsRouter);

app.listen(8800, () => {
    console.log("Backend server is running at 8800");
})