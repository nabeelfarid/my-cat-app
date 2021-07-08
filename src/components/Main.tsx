import { Box, Container } from "@material-ui/core";
import { useEffect } from "react";
import * as catsApi from "../cat-api";

const Main = () => {
  const getCats = async () => {
    try {
      let cats = await catsApi.getCats();

      console.log("getCats succesfull", cats[0].url);
    } catch (error) {
      console.log("geUserDiaries error", error);
    } finally {
    }
  };

  useEffect(() => {
    getCats();
  }, []);

  return (
    <main>
      <Container maxWidth="md">
        <Box>hello world</Box>
      </Container>
    </main>
  );
};

export default Main;
