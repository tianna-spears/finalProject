const { app } = require("../../server/server");
const { factory, seed_db } = require("../utils/seed_db");
const get_chai = require("../utils/get_chai");
const faker = require("@faker-js/faker").fakerEN_US;
const User = require("../../server/models/User");

describe("POST /register", () => {
  it("should register a new user with valid data", async () => {
    const { expect, request } = await get_chai();

const password = faker.internet.password();
const user = await factory.build("user", { password });

const dataToPost = {
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  password: password,
  courseName: "Node Express",
};

    const res = await request.execute(app).post("/register").send(dataToPost);

    expect(res).to.have.status(201);
    console.log('Response body:', res.body);

    expect(res.body).to.have.property('token');
    expect(res.body.user).to.have.property("email", user.email);

    const newUser = await User.findOne({ email: user.email });
    expect(newUser).to.not.be.null;
  });

  afterEach(async () => {
  await User.deleteMany({});
});

});
