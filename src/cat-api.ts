import axios from "axios";
import { Cat } from "./models";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_CAT_API_BASE_URL,
  headers: { "x-api-key": process.env.REACT_APP_CAT_API_KEY },
});

export const getCats = async (): Promise<Cat[]> => {
  let { data } = await axiosInstance.get<null, { data: Cat[] }>(
    `/images/?limit=99`
  );

  console.log("Cat Api - getCats:", data);

  return data;
};
