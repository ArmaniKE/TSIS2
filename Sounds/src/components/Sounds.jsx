import React, {useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Body from './Body';
import Footer from './Footer';
import axios from 'axios';
import { useStateProvider } from '../utils/StateProvider';
import { reducerCases } from '../utils/Constants';

export default function Sounds() {
  const [{token}, dispatch] = useStateProvider()
  const [navBackground, setNavBackground] = useState(false);
  const [headerBackground, setHeaderBackground] = useState(false);
  const bodyRef = useRef();
  const bodyScrolled = () => {
    bodyRef.current.scrollTop >= 100 ? setNavBackground(true) : setNavBackground(false)
    bodyRef.current.scrollTop >= 268 ? setHeaderBackground(true) : setHeaderBackground(false)
  };
  useEffect(() => {
    const getUserInfo = async() =>  {
      const {data} = await axios.get(
        "https://api.spotify.com/v1/me", 
        {
          headers: {
              Authorization: "Bearer " + token,
              "Content-type": "application/json",
          }
        });
        console.log("ko", data);
        const userInfo = {
          userId: data.id,
          userName: data.display_name,
          userImg: data.images,
          userEmail: data.email,
          userCntry: data.country,
          userFollowers: data.followers
        };
        // console.log(userInfo)
        dispatch({type:reducerCases.SET_USER, userInfo});
    };
    getUserInfo();
  }, [dispatch, token]);
  return (
    <Container>
      <div className="sounds_body">
        <Sidebar />
        <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
          <Navbar navBackground={navBackground}/>
          <div className="body_contents">
            <Body headerBackground={headerBackground} />
          </div>
        </div>
      </div>
      <div className="sounds_footer">
        <Footer />
      </div>
    </Container>
  )
}

const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 85vh 15vh;
  .sounds_body {
    display: grid;
    grid-template-columns: 15vh 85vw;
    height: 100%;
    width: 100%;
    background: linear-gradient(transparent, rgba(0,0,0,1));
    .body {
      height: 100%;
      width: 100%;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 0.7rem;
        &-thumb {
            background-colot: rgba(255,255,255, 0.6);
        }
    }
    }
  }
`;