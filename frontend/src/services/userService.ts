import axiosInstance from "./axiosInstance";

export const getUserService = async (token: string) => {
  const response = await axiosInstance.post("/login", {
    "id_token":token
  });
  // console.log(response.data);
  return response.data;
};
