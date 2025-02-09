import axiosInstance from "./axiosInstance";

export const loginService = async (idToken: string) => {
  const response = await axiosInstance.post("/login", {
    "id_token":idToken
  });
  //  console.log(response.data);
  return response.data;
};