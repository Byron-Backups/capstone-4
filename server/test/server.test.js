// This is the test file for server.js.

const request = require("supertest");

/* Testing notes:
- We use charliermarsh as the username here.
In package.json add '"type": "commonjs"' above the scripts section.
In the terminal run 'npm i supertest' to install supertest.
In the terminal run 'npm test' to test the server endpoints.
*/

// This is the test for the home page.
describe("GET /", () => {
  it("should return a welcome message.", (done) => {
    request("http://localhost:3001")
      .get("/")
      .expect("Content-Type", /string/)
      .expect(200);
    done();
  });
});

// This is the test for the repos page.
describe("GET /api/github/:username", () => {
  it("should return JSON of user's info.", (done) => {
    request("http://localhost:3001")
      // We use charliermarsh as the username here.
      .get("/api/github/charliermarsh")
      .expect("Content-Type", /json/)
      .expect(200);
    done();
  });
});

// This is the test for the commits page.
describe("GET /api/github/:username/repos", () => {
  it("should return JSON of user's repos & commits.", (done) => {
    request("http://localhost:3001")
      // We use charliermarsh as the username here.
      .get("/api/github/charliermarsh/repos")
      .expect("Content-Type", /json/)
      .expect(200);
    done();
  });
});

// This is a snapshot test for the GET /api/github/:username endpoint.
describe("GET /api/github/:username", () => {
  it("should match the snapshot", (done) => {
    request("http://localhost:3001")
      // We use charliermarsh as the username here.
      .get("/api/github/charliermarsh")
      .expect(200)
      .expect((res) => {
        expect(res.body).toMatchSnapshot();
      });
    done();
  });
});

// End.
