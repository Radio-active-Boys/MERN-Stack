const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
     
    contactName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    message: {
        type: String,
        required: true
    }
});

const ContactModel = mongoose.model("contactClient",contactSchema);

module.exports = ContactModel;