import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../components/Auth";
import firebaseConfig from "../config/firebase";
import "./Home.css";
import Header from "../components/Header";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  if (!currentUser) {
    return <Redirect to='/' />;
  }
  return (
    <div>
      <Header />
      <h1>Welcome {currentUser.displayName} </h1>
      <p>This is the dashboard, if you can see this you're logged in.</p>
      <button onClick={() => firebaseConfig.auth().signOut()}>Sign out</button>
    </div>
  );
};

export default Home;
