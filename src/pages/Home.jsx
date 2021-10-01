import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../components/Auth";
import "./Home.css";
import Header from "../components/Header";

const Home = () => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <div>
        <Header />
        <div className='homeContainer'>
          <h1>Bienvenue {currentUser.displayName} </h1>
          <p>This is the dashboard, if you can see this you're logged in.</p>
        </div>
      </div>
    </>
  );
};

export default Home;
