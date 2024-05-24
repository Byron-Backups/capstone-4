// This is the test file for server.js.

import request from "supertest";
import app from "../server.js";
import should from "chai";

describe("Server Tests", () => {
  it("should respond to root GET request", (done) => {
    request(app)
      .get("/")
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.text.should.equal("Hello, World!\nWelcome to Cappy!");
        done();
      });
  });

  it("should respond to api/github/{username} GET request", (done) => {
    request(app)
      .get("/api/github/:username")
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.property({});
        done();
      });
  });

  it("should respond to api/github/{username}/repos GET request", (done) => {
    request(app)
      .get("/api/github/charliermarsh/repos")
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.property("output");
        res.body.output.length.should.be.above(0);
        done();
      });
  });
});

// End.
