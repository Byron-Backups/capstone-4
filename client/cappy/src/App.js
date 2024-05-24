// Main App.js file.

// React imports:
import React, { createContext, useContext, useState, useEffect } from "react";
import LoadingPage from "./components/LoadingPage";
import DisplayUserInfo from "./components/DisplayUserInfo";
import DisplayRepos from "./components/DisplayRepos";
import "./App.css";
import { Helmet } from "react-helmet";

// Our context for the app.
function App() {
  // Our state variables for this app.
  const [username, setUsername] = useState("");
  const [user, setUser] = useState({}); // This is the user's data we will fetch.
  const [repos, setRepos] = useState([]);
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(false); // this is for the loading page.

  const onChangeInput = (event) => {
    const searchTerm = event.target.value;
    setUsername(searchTerm);
  };

  const onClickHandleSearchUser = () => {
    setLoading(true);
    fetch(`http://localhost:3001/api/github/${username}`) // Our server endpoint for fetching the user's data.
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      });
  };

  const onClickHandleSearchRepos = () => {
    setLoading(true);
    fetch(`http://localhost:3001/api/github/${username}/repos`) // Our server endpoint for fetching the user's data.
      .then((response) => response.json())
      .then((data) => {
        setRepos(data.repos);
        setCommits(data.commits);
        setLoading(false);
      });
  };

  if (loading) {
    return <LoadingPage />;
  } else {
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
          {/* User Profile Display Container */}
          <DisplayUserInfo user={user} />

          {/* Repo Display Container on the right. */}
          <div className="display-container">
            {Object.keys(user).length > 0 && (
              <button onClick={onClickHandleSearchRepos}>See Repos</button>
            )}
            <h2>User's Latest 5 Repos:</h2>
            <DisplayRepos repos={repos} commits={commits} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
// End.

/*



*/
