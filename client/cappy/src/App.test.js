// Testing file for Cappy.js.

import React from "react";
import { render, screen } from "@testing-library/react";
// Run 'npm i --save-dev jest enzyme'
//import { shallow } from 'enzyme';
// Components.
import LoadingPage from "./components/LoadingPage.jsx";
import DisplayRepos from "./components/DisplayRepos.jsx";
import DisplayUserInfo from "./components/DisplayUserInfo.jsx";

// Mock props:
const mockCommit = [
  {
    repo: "whisper.cpp-cli",
    commits: [
      {
        sha: "c99055cd840dcb20f9b03c2e8941629d9d890111",
        node_id:
          "C_kwDOL0HAqtoAKGM5OTA1NWNkODQwZGNiMjBmOWIwM2MyZTg5NDE2MjlkOWQ4OTAxMTE",
        commit: {
          author: {
            name: "Charlie Marsh",
            email: "charlie.r.marsh@gmail.com",
            date: "2024-05-01T05:03:54Z",
          },
          committer: {
            name: "GitHub",
            email: "noreply@github.com",
            date: "2024-05-01T05:03:54Z",
          },
          message: "Bump version to v0.0.3",
          tree: {
            sha: "4f0f9d40814c37a3e18c626a042fdbbfa833fef6",
            url: "https://api.github.com/repos/charliermarsh/whisper.cpp-cli/git/trees/4f0f9d40814c37a3e18c626a042fdbbfa833fef6",
          },
        },
      },
    ],
  },
];

const mockRepo = [
  {
    id: 792838314,
    node_id: "R_kgDOL0HAqg",
    name: "whisper.cpp-cli",
    description:
      "Packages whisper.cpp into pre-built, pip-installable wheels, for macOS and Linux.",
    created_at: "2024-04-27T17:36:45Z",
    updated_at: "2024-05-24T02:55:54Z",
    pushed_at: "2024-05-01T05:31:27Z",
  },
];

const mockUser = {
  name: "James Bond",
  login: "doubleOh7",
  avatar_url: "https://example.com/007.jpg",
  bio: "Licnese to kill.",
  created_at: "2022-01-01T00:00:00Z",
  public_repos: 10,
  followers: 100,
  following: 13,
  location: "San Francisco, CA",
  blog: "https://bonding.com",
  twitter_username: "doubleOhBehave",
  company: "ACME Inc.",
};

// Test for the loading page.
describe("LoadingPage component", () => {
  it("returns a <div>", () => {
    const component = LoadingPage;
    const { type } = component();
    expect(type).toBe("div");
  });
});

// Test for the DisplayRepos component.
describe("DisplayRepos", () => {
  test("renders no user message if no repos", () => {
    render(<DisplayRepos repos={[]} commits={[]} />);
    const element = screen.getByText(/No user, so no repos found/i);
    expect(element).toBeInTheDocument();
  });
});

// Test for the DisplayRepos component, alt.
describe("DisplayRepos component", () => {
  it("returns a <div> with props", () => {
    // Check for null or undefined props
    expect(mockRepo).toBeTruthy();
    expect(mockCommit).toBeTruthy();

    // Render the component
    render(<DisplayRepos repos={mockRepo} commits={mockCommit} />);

    // Check if the component exists in the document by checking if the repo name & commit have rendered.
    const component = screen.getByText(/whisper.cpp-cli/i);
    expect(component).toBeInTheDocument();
    const component2 = screen.getByText(/Bump version to v0.0.3/i);
    expect(component2).toBeInTheDocument();
  });
});

// Test for the DisplayUserInfo component.
describe("DisplayUserInfo component", () => {
  it("returns a <div> with props", () => {
    // Check for null or undefined props
    expect(mockUser).toBeTruthy();

    // Render the component
    render(<DisplayUserInfo user={mockUser} />);

    // Check if the component exists in the document by checking if the user's name has rendered.
    const component = screen.getByText(/James Bond/i);
    expect(component).toBeInTheDocument();
  });
});

test('MyComponent snapshot test', () => {
  const { asFragment } = render(<DisplayRepos repos={mockRepo} commits={mockCommit} />);
  expect(asFragment()).toMatchSnapshot();
});

// End.