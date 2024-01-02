const faker = require('faker');

// Function to generate a random user document
const generateUser = () => ({
  user: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(8),
    confirmPassword: faker.internet.password(8),
    dateOfBirth: faker.date.past(30).toISOString().split('T')[0],
    gender: faker.random.arrayElement(['male', 'female', 'other']),
    address: {
      street: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.stateAbbr(),
      zipCode: faker.address.zipCode(),
    },
  },
});

// Generate 100 user documents
const userDocuments = Array.from({ length: 100 }, generateUser);

// Output the generated documents
console.log(JSON.stringify(userDocuments, null, 2));

