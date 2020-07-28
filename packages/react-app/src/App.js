import React, {useState} from "react";
import { Link, Router } from "@reach/router";
import "./App.css";

import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import UploadBox from "./components/UploadBox";
import CreatorList from "./components/CreatorList";
import CreatorPage from "./components/CreatorPage";


function LogoutForm (props) {
props.setUserType(false);
props.setNodeUrl("");
props.setUserHandle("");
return (<></>)
}
export default function App() {
  const [userType, setUserType] = useState(false);
  const [nodeUrl, setNodeUrl] = useState(false);
  const [userHandle, setUserHandle] = useState(false);

  return (
    <center>
      <h1>Welcome to NuSubscribe!</h1>
      <p>
        {userType == "creator"
          ? "You are logged as a creator"
          : userType == "buyer"
          ? "You are logged as a subscriber"
          : "You are currently not logged in"}{" "}
      </p>

      <nav>
        {!userType && (
          <>
            <Link to="signup">Creator Sign Up</Link>
            <Link to="login">Log In</Link>
          </>
        )}
        {userType && (
          <>
            <Link to="logout">Log Out</Link>
          </>
        )}
        {userType === "creator" && (
          <>
            <Link to="upload">upload</Link>
          </>
        )}
        <Link to="creators">View Creators</Link>
      </nav>

      <Router>
        <SignupForm path="/signup" />
        <LoginForm
          path="/login"
          setUserType={setUserType}
          setNodeUrl={setNodeUrl}
          setUserHandle={setUserHandle}
        />
        <LogoutForm
          path="/logout"
          setUserType={setUserType}
          setNodeUrl={setNodeUrl}
          setUserHandle={setUserHandle}
        />
        <UploadBox path="/upload" handle={userHandle} nodeUrl={nodeUrl} />
        <CreatorList path="/creators" />
        <CreatorPage path="/creators/:creatorHandle" nodeUrl={nodeUrl} />
      </Router>
    </center>
  );
}
