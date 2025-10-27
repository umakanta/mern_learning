import { axiosInstance } from ".";

export const getAllMovies = async () => {
    try {
        const response = await axiosInstance.get("/movies/getAllMovies");
        return response?.data;
    } catch (error) {
        return error;
    }
}

export const addMovie = async (values) => {
    try {
        const response = await axiosInstance.post("/movies/addMovie", values);
        console.log(response);
        return response?.data;
    } catch (error) {
        console.log("Error while addMovie", error);
        return error;
    }
}

export const updateMovie = async (values) => {
    try {
        const response = await axiosInstance.patch("/movies/updateMovie", values);
        console.log(response);
        return response?.data;
    } catch (error) {
        return error;
    }
}

export const deleteMovie = async (movieId) => {
    try {
        // console.log("deleteMovie:", movieId);
        const response = await axiosInstance.delete(`/movies/deleteMovie/${movieId}`);
        return response?.data;
    } catch (error) {
        console.log("err:  ", error);
        return error;
    }
}