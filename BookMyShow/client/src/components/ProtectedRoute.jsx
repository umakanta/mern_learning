import React from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { Layout, Menu, message } from "antd";
import { GetCurrentUser } from "../api/user";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userSlice";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { HomeOutlined, LogoutOutlined, ProfileOutlined } from "@ant-design/icons"

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector((state) => state.user);
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

    const navItems = [
        {
            key: "Home",
            label: <span onClick={() => navigate("/")}> Home </span>,
            icon: <HomeOutlined />
        },
        {
            key: "Profile",
            label: <span onClick={() => {
                if (user?.role === "admin") {
                    navigate("/admin");
                } else if (user?.role === "partner") {
                    navigate("/partner");
                } else {
                    navigate("/profile");
                }
            }}>
                My Profile</span>,
            icon: <ProfileOutlined />
        },
        {
            key: "Logout",
            label: (
                <Link to="/logIn"
                    onClick={() => {
                        localStorage.removeItem("tokenForBMS");
                    }}
                >
                    Logout
                </Link>
            ),
            icon: <LogoutOutlined />
        }
    ];
    return (
        <>
            <Layout>
                <Header className="justify-content-between"
                    style={{ position: "sticky", top: 0, zIndex: 1, width: "100%", allignItems: "center", display: "flex" }}
                   
                >
                    <h3 className="text-white m-0"  onClick={ () => navigate("/")}>BookMyShow</h3>
                    <Menu theme="dark" mode="horizontal" items={navItems} />

                </Header>
                <Content> {children} </Content>
                <Footer style={{
                    textAlign: "center",
                    backgroundColor: "#001529",
                    color: "white",
                    position: "absolute",
                    bottom: 0,
                    width: "100%"
                }}>
                    BookMyShow © {new Date().getFullYear()} Created By Uks
                </Footer>
            </Layout>

        </>
    );
};

export default ProtectedRoute;