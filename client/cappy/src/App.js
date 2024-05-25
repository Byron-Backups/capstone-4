// Main App.js file.

// React imports:
import React, { useState } from "react";
import LoadingPage from "./components/LoadingPage";
import DisplayUserInfo from "./components/DisplayUserInfo";
import DisplayRepos from "./components/DisplayRepos";
import "./App.css";
import { Helmet } from "react-helmet";

// Our context for the app.
function App() {
  // Our state variables for this app.
  const [username, setUsername] = useState("");   // The username we get from search.
  const [user, setUser] = useState({});           // This is the user's data we will fetch.
  const [repos, setRepos] = useState([{}]);       // An object array with the user's latest 5 repos (defualt structure).
  const [commits, setCommits] = useState([{}]);   // An object array with structure {"repo": repo.name, "commits": commits}.
  const [loading, setLoading] = useState(false);  // This is for the loading page. Set to true to watch a cool animation.

  // As the user types, we update the username variable.
  const onChangeInput = (event) => {
    const searchTerm = event.target.value;
    setUsername(searchTerm);
  };

  // As the user clicks on the search button, we fetch the user's data.
  const onClickHandleSearchUser = () => {
    setLoading(true);
    fetch(`http://localhost:3001/api/github/${username}`) // Our server endpoint for fetching the user's data.
      .then((response) => response.json())
      .then((data) => {
        // Update our state variables.
        setUser(data);
        setLoading(false);
      });
  };

  // As the user clicks on the searchRepos button, we fetch the user's repos and commit messages.
  const onClickHandleSearchRepos = () => {
    setLoading(true);
    fetch(`http://localhost:3001/api/github/${username}/repos`) // Our server endpoint for fetching the user's data.
      .then((response) => response.json())
      .then((data) => {
        // Update our state variables.
        setRepos(data.repos);
        setCommits(data.commits);
        setLoading(false);
      });
  };

  if (loading) {
    return <LoadingPage />;
  } else {
    // Our main page that loads after the loading page is done waiting for the api calls.
    return (
      <div className="App">
        <Helmet>
          <title>Find a Dev.</title>
        </Helmet>

        {/* Our search bar with input and button. */}
        <div className="search-bar">
          <label id="search-label" className="label" htmlFor="search-input">
            Find a Developer.
          </label>
          <br></br>
          <input
            type="text"
            id="search-input"
            onChange={onChangeInput}
            placeholder="Username to search..."
          />
          <button id="search-btn" onClick={onClickHandleSearchUser}>
            Search
          </button>
        </div>

        {/* User Profile Display Container and Repo Display Container on the Right */}
        <div className="container">
          {/* User Profile Display Container on the left. */}
          <DisplayUserInfo user={user} />

          {/* Repo & commits Display Container on the right. */}
          <div className="display-container">
            {/* This will display the 'see repos' button if there is a user set. */}
            {Object.keys(user).length > 0 && (
              <button onClick={onClickHandleSearchRepos}>See Repos</button>
            )}
            <h2>User's 5 Latest Repos:</h2>
            <DisplayRepos repos={repos} commits={commits} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
// End.
