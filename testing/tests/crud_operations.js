const { app } = require("../../server/server");
const { factory, seed_db, testUserPassword } = require("../utils/seed_db");
const get_chai = require("../utils/get_chai");
const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");

const Assignment = require("../../server/models/Assignment");

describe("POST /assignments", () => {
  let token, request, expect, testUser;

  let course;

  before(async () => {
    ({ request, expect } = await get_chai());

    testUser = await seed_db();

    factory.define("assignment", Assignment, {
      title: () => faker.lorem.sentence(3),
      dueDate: () => faker.date.future(),
      courseID: () => new mongoose.Types.ObjectId(),
      lesson: () => faker.number.int({ min: 1, max: 25 }),
      createdBy: () => testUser._id,
    });

    course = await factory.create("course", { createdBy: testUser._id });

    await factory.createMany("assignment", 20, {
      courseID: course._id,
      createdBy: testUser._id,
    });

    const loginRes = await request.execute(app).post("/login").send({
      email: testUser.email,
      password: testUserPassword,
    });

    token = loginRes.body.token;
  });

  it("should create a new assignment and result in 21 total", async () => {
    const newAssignment = await factory.build("assignment", {
      courseID: course._id,
    });

    const res = await request
      .execute(app)
      .post("/assignments")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: newAssignment.title,
        dueDate: newAssignment.dueDate,
        courseID: newAssignment.courseID,
        lesson: newAssignment.lesson,
      });
    console.log("Response from /assignments POST:", res.body);

    expect(res).to.have.status(201);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("assignment");
    expect(res.body.assignment).to.have.property("_id");

    expect(res).to.have.status(201);

    const allAssignments = await Assignment.find({ courseID: course._id });
    console.log("All assignments in DB:", allAssignments);
    expect(allAssignments.length).to.equal(21);
  });

  afterEach(async () => {
    await Assignment.deleteMany({});
  });
});
