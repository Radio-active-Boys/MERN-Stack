const mongoose = require('mongoose');

// Define the schema
const techWorkSchema = new mongoose.Schema({
  work: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  expertise: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

// Create the model
const TechWork = mongoose.model('work07', techWorkSchema);

// Export the model
module.exports = TechWork;
