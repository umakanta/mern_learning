import { axiosInstance } from ".";

export const addShow = async (payload) => {
  try {
    const response = await axiosInstance.post("/shows/addShow", payload);
    return response.data;
  } catch (err) {
    return err.message;
  }
};

export const updateShow = async (payload) => {
  try {
    const response = await axiosInstance.patch("/shows/updateShow", payload);
    return response.data;
  } catch (err) {
    return err.message;
  }
};

export const deleteShow = async (payload) => {
  try {
    const response = await axiosInstance.delete(
      `/shows/deleteShow/${payload.showId}`
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
};

export const getShowsByTheater = async (payload) => {
  try {
    const response = await axiosInstance.get(
      `shows/getAllShowsByTheater/${payload.theaterId}`
    );
    return response.data;
  } catch (err) {
    return err.response;
  }
};

export const getAllTheatersByMovie = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "shows/getAllTheatersByMovie",
      payload
    );
    return response.data;
  } catch (err) {
    return err.response;
  }
};