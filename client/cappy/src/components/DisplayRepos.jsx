// This component gets the user as a param and displays their latest 5 repos with commit messages.
import React from "react";
import moment from "moment";

const DisplayRepos = ({ repos, commits }) => {
  // Some simple handling if there are no repos to show.
  if (repos.length === 0) {
    return <h3>No user, so no repos found.</h3>;
  }

  // User was selected and repos were found.
  return (
    <div className="repos-container">
      {/* Mapping through the repos first. */}
      {repos.map((repo) => {
        // Now mapping through the commits for each repo.
        <div className="repos" key={repo.id}>
          <h3>{repo.name}</h3>
          <p>{repo.description}</p>
          <p>Created: {moment(repo.created_at).format("D MMM YYYY")}</p>
          <p>Last Commit: {moment(repo.pushed_at).format("D MMM YYYY")}</p>
          <ul>
            {commits.map((commit) => (
              <li>{commit.message}</li>
            ))}
          </ul>
        </div>;
      })}
    </div>
  );
};

export default DisplayRepos;
// End.
