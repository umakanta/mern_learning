import { axiosInstance } from ".";

export const RegisterUser = async (values) => {
    try {
        const response = await axiosInstance.post("/users/register", values)
        console.log(response);
        return response.data;
    } catch (err) {
        console.log("Error: ", err);
    }
};

export const LoginUser = async (values) => { 
    try {
        const response = await axiosInstance.post("/users/login", values)
        console.log(response);
        return response.data;
    } catch (err) {
        console.log("Error: ", err);
    }
};

export const GetCurrentUser = async () => { 
    try {
        const response = await axiosInstance.get("/users/getCurrentUser")
        console.log(response);
        return response.data;
    } catch (err) {
        console.log("Error: ", err);
    }
};

// module.exports = { RegisterUser, LoginUser };
