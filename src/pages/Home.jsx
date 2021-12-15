import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../components/Auth";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import MainTitle from "../components/MainTitle";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  if (!currentUser) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <header>
        <Header />
        <NavBar />
      </header>
      <MainTitle title='Nous avons choisi une date' />
    </>
  );
};

export default Home;
