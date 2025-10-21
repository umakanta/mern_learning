import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { message } from "antd";
import { GetCurrentUser } from "../api/user";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

const ProtectedRoute = (children) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getValidUser = async () => {
        try {
            dispatch(showLoading());
            const response = await GetCurrentUser();
            if (response.success) {
                dispatch(setUser(response?.data));
            } else {
                message.warning(response?.message);
            }

        } catch (error) {
            message.error(error);
        } finally {
            dispatch(hideLoading());
        }
    };
    useEffect(() => {
        if (localStorage.getItem("tokenForBMS")) {
            // token is valid
            getValidUser();
        } else {
            navigate("/login");
        }
    }, [])

    return <>{children}</>
};

export default ProtectedRoute;