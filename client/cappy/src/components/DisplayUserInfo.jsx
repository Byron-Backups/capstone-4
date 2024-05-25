// This component will get the user's data from App.js and display it.
import React from "react";
import moment from "moment";
import userIconImage from "../images/user-icons.jpg";   // stock image for icon.

const DisplayUserInfo = ({user}) => {
  return (
    // This is where we display the user's data, or the default value if there is no user set yet.
    <div className="profile-container">
      <h2>{user.name || "Name"}</h2>
      <img src={user.avatar_url ? user.avatar_url : userIconImage} alt="User Avatar."/>
      <p>@{user.login || "Username"}</p>
      <p>{user.bio || "This profile has no bio."}</p>
      {/* We are using moment to parse the timestamp data and format it. */}
      <p>Joined Github: {moment(user.created_at).format("D MMM YYYY")}</p>
      <p>Repos: {user.public_repos  || "0"}</p>
      <p>Followers: {user.followers || "0"}</p>
      <p>Following: {user.following || "0"}</p>
      <p>Location: {user.location || "Location Not Available."}</p>
      <p>Website: {user.blog || "Website Not Available."}</p>
      <p>Twitter: {user.twitter_username || "Twitter Not Available."}</p>
      <p>Company: {user.company || "Company Not Available."}</p>
    </div>
  );
};

export default DisplayUserInfo;
// End.
