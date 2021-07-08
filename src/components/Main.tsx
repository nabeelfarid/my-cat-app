import { Box, Container, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import * as catsApi from "../cat-api";
import { Cat } from "../models";
import CatCard from "./CatCard";

const Main = () => {
  const [cats, setCats] = useState<Cat[]>([]);

  const getCats = async () => {
    try {
      let data = await catsApi.getCats();
      setCats(data);
      console.log("getCats succesfull", data[0].url);
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
        <Box>
          <Grid container spacing={4}>
            {cats.map((cat) => (
              <Grid key={cat.id} item xs={12} sm={6} md={4} lg={3}>
                <CatCard cat={cat} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </main>
  );
};

export default Main;
