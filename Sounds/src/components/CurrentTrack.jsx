import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
export default function CurrentTrack() {
  const [{ token, currentlyPlaying }, dispatch] = useStateProvider();
  useEffect(() => {
    // Get Currently Playing Track
    const getCurrentTrack = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.data !== "") {
        const currentlyPlaying = {
          id: response.data.item.id,
          name: response.data.item.name,
          artists: response.data.item.artists.map((artist) => artist.name),
          image: response.data.item.album.images[2].url,
        };
        // console.log("HELLO", currentlyPlaying);
        dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
      } else {
        dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying: null });
      }
    };
    getCurrentTrack();
  }, [token, dispatch]);
  
  return (
    <Container>
      {
      currentlyPlaying && (
        <div className="track">
          <div className="track_image">
            <img src={currentlyPlaying.image} alt="currentlyPlaying" />
          </div>
          <div className="track_info">
            <h4 className="track_info_track_name">{currentlyPlaying.name}</h4>
            <h6 className="track_info_track_artists">
              {currentlyPlaying.artists.join(", ")}
            </h6>
          </div>
        </div>
      )
      }
    </Container>
  );
}

const Container = styled.div`
  .track {
    display: flex;
    align-items: center;
    gap: 1rem;
    &_image {
    }
    &_info {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      &_track_name {
        color: white;
      }
      &_track_artists {
        color: #b3b3b3;
      }
    }
  }
`;