import axios from "axios";
import { CatImage, Favourite, Vote, VoteValue } from "./models";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_CAT_API_BASE_URL,
  headers: { "x-api-key": process.env.REACT_APP_CAT_API_KEY },
});

export const getCatImages = async (): Promise<CatImage[]> => {
  let { data } = await axiosInstance.get<null, { data: CatImage[] }>(
    `/images/?limit=99`
  );

  console.log("Cat Api - getCats:", data);

  return data;
};

export const getFavourites = async (): Promise<Favourite[]> => {
  let { data } = await axiosInstance.get<null, { data: Favourite[] }>(
    `/favourites`
  );

  console.log("Cat Api - getFavourites:", data);

  return data;
};

export const getVotes = async (): Promise<Vote[]> => {
  let { data } = await axiosInstance.get<null, { data: Vote[] }>(`/votes`);

  console.log("Cat Api - getVotes:", data);

  return data;
};

export const setFavourite = async (imageId: string): Promise<string> => {
  let { data } = await axiosInstance.post<
    { image_id: string },
    { data: { id: string } }
  >(`/favourites`, {
    image_id: imageId,
  });

  console.log("Cat Api - setFavourite:", data);

  return data.id;
};

export const deleteFavourite = async (
  favouriteId: string
): Promise<boolean> => {
  let { data } = await axiosInstance.delete<
    null,
    { data: { message: string } }
  >(`/favourites/${favouriteId}`);

  console.log("Cat Api - deleteFavourite:", data);

  return true;
};

export const deleteCatImage = async (catId: string): Promise<boolean> => {
  let { data } = await axiosInstance.delete<
    null,
    { data: { message: string } }
  >(`/images/${catId}`);

  console.log("Cat Api - deleteCat:", data);

  return true;
};

export const vote = async (
  imageId: string,
  vote: VoteValue
): Promise<string> => {
  console.log("vote api: ", imageId, vote);
  let { data } = await axiosInstance.post<
    { image_id: string; value: number },
    { data: { id: string } }
  >(`/votes`, {
    image_id: imageId,
    value: vote,
  });

  console.log("Cat Api - Votes:", data);

  return data.id;
};
