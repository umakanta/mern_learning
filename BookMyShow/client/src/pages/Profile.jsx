import React from 'react'
import { useSelector } from 'react-redux';

export const Profile = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className='App-header'>
      <div className="profile-card text-center">
        <img 
          src={ user?.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" }
          alt="Profile"
          className='profile-pic d-block mx-auto'
          width={200} height={200} />
          <h2 className='profile-name'>{ user?.name }</h2>
          <p className='profile-email'>{ user?.email }</p>
          <p className='profile-role'>{ user?.role }</p>
          <p className='profile-id mt-3'> User ID: {user._id} </p> 
      </div>
    </div>
  )
}
