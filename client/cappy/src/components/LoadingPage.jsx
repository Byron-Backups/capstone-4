// This is the loading page that will be displayed while the API's are loading.
import React from "react";
import { Helmet } from "react-helmet";

// It simply shows that the page is loading with a nice wallpaper.
const LoadingPage = () => {
  return (
    <div className="LoadingPage">
      <Helmet>
        <title>Your Page is Loading...</title>
      </Helmet>
      <h1 style={{ textAlign: "center" }}>Loading...</h1>
      {/* Our wallpapers and loading animation are set in app.css. */}
    </div>
  );
};

export default LoadingPage;
// End.
