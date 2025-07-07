// testing with two models from my final project-
// User and Course Models
const mongoose = require("mongoose");
const User = require("../../server/models/User");
const Course = require("../../server/models/Course");
const faker = require("@faker-js/faker").fakerEN_US;
const FactoryBot = require("factory-bot");

const MONGODB_URI_TEST = require("../setup");

const testUserPassword = faker.internet.password();
const factory = FactoryBot.factory;
const factoryAdapter = new FactoryBot.MongooseAdapter();
factory.setAdapter(factoryAdapter);
factory.define("course", Course, {
  courseName: () => faker.lorem.words(4),
courseDates: () => {
  const start = faker.date.future();
  const end = faker.date.between({
    from: start,
    to: new Date(start.getTime() + 7 * 24 * 60 * 60 * 1000),
  });
  const formatDate = (date) => {
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  };
  return `${formatDate(start)} - ${formatDate(end)}`;
}
})
factory.define("user", User, {
  firstName: () => faker.person.firstName(),
  lastName: () => faker.person.lastName(),
  email: () => faker.internet.email(),
  password: () => faker.internet.password(),
  courseID: () => new mongoose.Types.ObjectId(),
});

const seed_db = async () => {
  let testUser = null;
  try {
    // let MONGODB_URI_TEST = process.env.MONGODB_URI_TEST;
    await Course.deleteMany({});
    await User.deleteMany({}); 
    await Course.create({ courseName: 'Node Express', courseDates: [] });
    testUser = await factory.create("user", { password: testUserPassword });
    await factory.createMany("course", 10, { createdBy: testUser._id }); // put 10 course entries in the database.
  } catch (e) {
    console.log("database error");
    console.log(e.message);
    throw e;
  }
  return testUser;
};

module.exports = { testUserPassword, factory, seed_db };