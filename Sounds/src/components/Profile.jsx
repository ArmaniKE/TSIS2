import React, { useEffect } from 'react';
import { useStateProvider } from '../utils/StateProvider';
import { reducerCases } from '../utils/Constants';
import styled from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function Profile() {
  const [{ token }, dispatch] = useStateProvider();
  const [{ userInfo }] = useStateProvider();
  const [{selectedPlaylistId}, ] = useStateProvider();

  useEffect(() => {
    console.log("ok", userInfo);
    console.log("ok2", userInfo.userImg);
  }, [token, dispatch]);

  // const arrayDataItems = userInfo.userImg.map((course) => <li><img src={course.url}/></li>);

  return (

    <Container>
      <img src={userInfo?.userImg[1].url} width="30%" height="30%" alt="negr" className="img" />
      <h1>Welcome to your profile</h1>
      <h1>{userInfo?.userName}</h1>
      <h3>Your user id: {userInfo?.userId}</h3>
      <h3>Your country: {userInfo?.userCntry}</h3>
      <h3>Your email: {userInfo?.userEmail}</h3>
      <h3>Your followers: {userInfo?.userFollowers.total}</h3>

    </Container>
  );
  

}

const Container = styled.div`
  background: linear-gradient(transparent, rgba(0,0,0,1));
  padding: 260px;
  border-radius: 10px;
  color: white;
  // text-align: center;
  .img{
    float: left;
    padding-right: 100px;
  }
`;
