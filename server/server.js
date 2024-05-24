// This is our main server file.

const fs = require("fs");
const cors = require("cors");
const axios = require("axios");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 3001;
// It's dangerous to go alone. Take this:
// Server is using Cors.
app.use(cors());

// This is just a blank home page message.
app.get("/", (req, resp) => {
  resp.send("Hello, World! Welcome to Cappy!");
});

/**
 * Fetches GitHub user data for a given username and returns the response as JSON.
 * Also writes that user's data to a local folder (json), in a JSON file of their username.
 */
app.get("/api/github/:username", async (req, resp) => {
  const { username } = req.params;
  const url = `https://api.github.com/users/${username}`;
  const { data } = await axios.get(url);

  // Now we write that user's data to a JSON file with their username.
  fs.writeFile(`./json/${username}.json`, JSON.stringify(data), (err) => {
    if (err) console.error(err);
  });
  // Send the user data back to the client.
  resp.json(data);
});

/**
 * Fetches the latest 5 GitHub user repos for a given username and returns the response as JSON.
 * Also writes that user's repos to a local folder (json), in a JSON file of their username_repos.
 */
app.get("/api/github/:username/repos", async (req, resp) => {
  const { username } = req.params;
  const url = `https://api.github.com/users/${username}/repos?sort=updated&per_page=5`;
  const { data } = await axios.get(url);

  // Now we write that user's repos to a JSON file with their username_repos.
  fs.writeFile(`./json/${username}_repos.json`, JSON.stringify(data), (err) => {
      if (err) console.error(err);
    }
  );

  // We have the repos, now fetch the latest 5 commit messages for each repo.
  // This for loop will go through each repo and fetch the latest 5 commit messages,
  // and push them to an array called commitMessages.
  for (let i = 0; i < data.length; i++) {
    console.log(i)
    const repo = data[i];
    console.log(repo.name);
    const { commits } = await axios.get(
      `https://api.github.com/repos/${username}/${repo.name}/commits?sort=updated&per_page=5`
    );

    // Push just the commit messages to a string array.
    const commitMessages = [];
    commitMessages.push(...commits.map(commit => commit.commit.message));
  }

  // Now we write that user's commit messages to a JSON file with their username_commits.
  fs.writeFile(
    `./json/${username}_commits.json`,
    JSON.stringify(commitMessages),
    (err) => {
      if (err) console.error(err);
    }
  );

  // Send the user repos and commits back to the client.
  const output = { repos: repos, commits: commitMessages };
  resp.json(output);
});

// The port we are running the server on.
app.listen(port, () =>
  console.log(
    `Listening engaged.\nServer is running on http://localhost:${port}`
  )
);

// End.
