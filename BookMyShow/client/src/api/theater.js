import { axiosInstance } from ".";

export const getAllTheaters = async () => {
    try {
        const response = await axiosInstance.get("/theaters/getAllTheaters");
        return response?.data;
    } catch (error) {
        return error;
    }
}

export const getAllTheatersByOwner = async () => {
    try {
        const response = await axiosInstance.get("/theaters/getAllTheatersByOwner");
        return response?.data;
    } catch (error) {
        return error;
    }
}

export const addTheater = async (values) => {
    try {
        console.log(values);
        const response = await axiosInstance.post("/theaters/addTheater", values);
        console.log(response);
        return response?.data;
    } catch (error) {
        console.log("Error while addTheater", error);
        return error;
    }
}

export const updateTheater = async (values) => {
    try {
        const response = await axiosInstance.patch("/theaters/updateTheater", values);
        console.log(response);
        return response?.data;
    } catch (error) {
        return error;
    }
}

export const deleteTheater = async (theaterId) => {
    try {
        // console.log("deleteTheater:", theaterId);
        const response = await axiosInstance.delete(`/theaters/deleteTheater/${theaterId}`);
        return response?.data;
    } catch (error) {
        console.log("err:  ", error);
        return error;
    }
}