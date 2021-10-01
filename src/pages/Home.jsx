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
          <h1>Bienvenue</h1>
          <p>Sur le site du Mariage de Camille et Benjamin</p>
        </div>
      </div>
    </>
  );
};

export default Home;
