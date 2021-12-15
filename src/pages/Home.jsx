import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../components/Auth";
import Header from "../components/Header";
import NavBar from "../components/NavBar";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  if (!currentUser) {
    return <Redirect to='/' />;
  }

  return (
    <header>
      <Header />
      <NavBar />
    </header>
  );
};

export default Home;
