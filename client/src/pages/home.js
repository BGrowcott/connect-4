import React from "react";
import GameBoard from "../components/gameComponents/GameBoard";
import fetchWithJWT from "../utils/fetchWithJWT";

const Home = () => {

  async function apiTest() {
    const response = await fetchWithJWT("/api/match");
    const data = await response.json();
    console.log(data)
  }

  apiTest();

  return (
    <section>
      <GameBoard/>
    </section>
  );
}

export default Home;
