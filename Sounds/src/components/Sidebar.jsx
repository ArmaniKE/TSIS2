import React from 'react'
import styled from 'styled-components'
import {IoLibrary} from "react-icons/io5"
import {MdHomeFilled, MdSearch} from "react-icons/md"
import Playlists from './Playlists'
export default function Sidebar() {
  return (
    <Container>
        <div className="top_links">
            <div className="logo">
                {/* <img src="logo1.png" alt="sounds" /> */}
            </div>
            <ul>
                <li>
                    <MdHomeFilled />
                    <span>Home</span>
                </li>
                <li>
                    <MdSearch />
                    <span>Search</span>
                </li>
                <li>
                    <IoLibrary />
                    <span>Your Library</span>
                </li>
            </ul>
        </div>
        <Playlists />
    </Container>
  )
}

const Container = styled.div`
background-color: gray;
// color: #b3b3b3
display: flex;
flex-direction: column;
height: 100%;
width: 120%;
.top_links {
    display: flex;
    flex-direction: column;
    .logo {
        text-align: center;
        margin: 1rem 0;
        img {
            min-inline-size: 100%;
            block-size: auto;
        }
    }
    ul {
        list-style-type: none;
        display:flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        li {
            display: flex;
            gap: 1rem;
            cursor: pointer;
            transition: 0.3s ease-in-out;
            &:hover {
                color: white;
            }
        }
    }
}
`;
