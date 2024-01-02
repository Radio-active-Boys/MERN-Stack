const mongoose = require("mongoose");

const connect = (uri) =>{
    console.log("Coonection with DB is successful");
    return mongoose.connect(uri);
}

module.exports = connect;