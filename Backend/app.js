require("dotenv").config();
const express = require("express");
const connectDB = require("./Database/connect/connect.js");
const PORT = process.env.PORT||5000;
const router = require("./router/router.js");
const bodyParser = require("body-parser");
const cors = require('cors')
const corsOptions = {
    origin: 'https://radioactive.onrender.com',
    methods: "GET,POST,DELETE,PUT,PATCH,HEAD",
    credentials: true,     
  };
const app = express();
app.use(cors(corsOptions));
// Parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// error middle ware for all errro handling ONE PLACE
const errorMiddleware = require("./validator/middleware/error-middleware.js");

// setting connetion with route links
app.use("/mern/main",router);

// setting error middle ware
app.use(errorMiddleware);

const start = async() =>{
    try {await connectDB(process.env.MONGODB_URI);
        app.listen(PORT, () => {
            console.log(`${PORT} port in use`);
        });
    } 
    catch (error) {
        console.log(error);
    }
}

start();
