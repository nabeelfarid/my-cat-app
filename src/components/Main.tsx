import { Box, Container, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import * as catsApi from "../cat-api";
import { CatImage, Favourite, Vote, VoteValue } from "../models";
import CatCard from "./CatCard";
import Loader from "./Loader";
import { Route, Routes } from "react-router-dom";
import UploadCat from "./UploadCat";

const Main = () => {
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [catImages, setCatImages] = useState<CatImage[]>([]);
  const [favourites, setFavourites] = useState<Favourite[]>([]);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [selectedCatImage, setSelectedCatImage] = useState<CatImage | null>(
    null
  );
  const [uploadFileInProgress, setUploadFileInProgress] = useState(false);

  const getCats = async () => {
    try {
      let dataImages = await catsApi.getCatImages();
      let dataFavourites = await catsApi.getFavourites();
      let dataVotes = await catsApi.getVotes();
      setCatImages(dataImages);
      setFavourites(dataFavourites);
      setVotes(dataVotes);
    } catch (error) {
      console.log("getCats error", JSON.stringify(error, null, 2));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCats();
  }, []);

  const favouriteHandler = async (cat: CatImage, favourite: boolean) => {
    console.log(cat, favourite);
    setSelectedCatImage(cat);

    if (favourite) {
      try {
        let newFavouriteId = await catsApi.setFavourite(cat.id);

        setFavourites((pre) => [
          ...pre,
          { id: newFavouriteId, image_id: cat.id },
        ]);
        console.log("Favourite set succesfully", newFavouriteId);
      } catch (error) {
        console.log("setFavourite error", JSON.stringify(error, null, 2));
      } finally {
        setSelectedCatImage(null);
      }
    } else {
      const favouriteToDelete = favourites.find((f) => f.image_id === cat.id);
      if (favouriteToDelete) {
        try {
          await catsApi.deleteFavourite(favouriteToDelete.id);

          setFavourites((pre) =>
            pre.filter((f) => f.id !== favouriteToDelete.id)
          );
          console.log("Favourite deleted succesfully", favouriteToDelete.id);
        } catch (error) {
          console.log("deleteFavourite error", JSON.stringify(error, null, 2));
        } finally {
          setSelectedCatImage(null);
        }
      }
    }
  };

  const deleteHandler = async (cat: CatImage) => {
    console.log(cat);
    setSelectedCatImage(cat);
    try {
      await catsApi.deleteCatImage(cat.id);

      setCatImages((pre) => pre.filter((c) => c.id !== cat.id));
      console.log("Cat deleted succesfully", cat.id);
    } catch (error) {
      console.log("deleteCat error", JSON.stringify(error, null, 2));
    } finally {
      setSelectedCatImage(null);
    }
  };

  const voteHandler = async (cat: CatImage, voteValue: VoteValue) => {
    console.log(cat, voteValue);
    setSelectedCatImage(cat);
    try {
      const newVoteId = await catsApi.vote(cat.id, voteValue);

      setVotes((pre) => [
        ...pre,
        { id: newVoteId, image_id: cat.id, value: voteValue },
      ]);
      console.log("Cat voted succesfully", cat.id);
    } catch (error) {
      console.log("vote error", JSON.stringify(error, null, 2));
    } finally {
      setSelectedCatImage(null);
    }
  };

  const uploadHandler = async (file: File) => {
    console.log(file);
    setUploadFileInProgress(true);
    try {
      const newCat = await catsApi.upload(file);

      setCatImages((pre) => [{ id: newCat.id, url: newCat.url }, ...pre]);
      console.log("Cat uploaded succesfully", newCat);
    } catch (error) {
      console.log("Cat upload error", JSON.stringify(error, null, 2));
    } finally {
      setUploadFileInProgress(false);
    }
  };

  const calculateScore = (cat: CatImage): number => {
    const upVotes = votes.filter(
      (v) => v.image_id === cat.id && v.value === 1
    ).length;
    const downVotes = votes.filter(
      (v) => v.image_id === cat.id && v.value === 0
    ).length;

    return upVotes - downVotes;
  };

  return (
    <main>
      <Container maxWidth="lg">
        <Box mb={4} textAlign="center">
          <Routes>
            <Route
              path="upload"
              element={
                <UploadCat
                  loading={uploadFileInProgress}
                  uploadHandler={uploadHandler}
                />
              }
            />
            <Route
              path="/"
              element={
                <UploadCat
                  loading={uploadFileInProgress}
                  uploadHandler={uploadHandler}
                />
              }
            />
          </Routes>
        </Box>
        <Box>
          {/* {error && <Error error={error} />} */}
          {loading && <Loader showCircularProgress={false} />}

          <Grid container spacing={4}>
            {catImages.map((cat) => (
              <Grid key={cat.id} item xs={12} sm={6} md={4} lg={3}>
                <CatCard
                  cat={cat}
                  isFavourite={favourites.some((f) => f.image_id === cat.id)}
                  score={calculateScore(cat)}
                  inProgress={
                    selectedCatImage && selectedCatImage.id === cat.id
                      ? true
                      : false
                  }
                  favouriteHandler={favouriteHandler}
                  deleteHandler={deleteHandler}
                  voteHandler={voteHandler}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </main>
  );
};

export default Main;
