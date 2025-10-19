import { message } from 'antd';
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GetCurrentUser } from '../api/user';
import { useState } from 'react';

const Home = () => {
  const [userInfo, setUserInfo] = useState();

  const navigate = useNavigate();
  const getValidUser = async () => {
    try {
      const response = await GetCurrentUser();
      if (response.success) {
        setUserInfo(response?.data);
      }
    } catch (error) {
      message.error(error);
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
  return (
    <>
      <div>Home</div>
      <div> Hello : {userInfo?.name}</div>
      <div>Email : {userInfo?.email}</div>
      <div>Role : {userInfo?.role}</div>

      <Link to="/login" onClick={() => {
        localStorage.removeItem("tokenForBMS");
      }}>
        Logout
      </Link>
    </>
  )
}

export default Home