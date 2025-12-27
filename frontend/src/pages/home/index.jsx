import React, { useEffect } from "react";
import { HomeContainer } from "./styled.js";
import { Card } from "../../components/index.js";

const Home = () => {
  return (
    <HomeContainer>
      <h2>Latest recipes</h2>
      <Card />
    </HomeContainer>
  );
};

export default Home;
