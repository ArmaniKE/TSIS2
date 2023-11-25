import React from 'react'
import styled from 'styled-components'
import {FaSearch} from 'react-icons/fa'
import {CgProfile} from 'react-icons/cg'
import { useStateProvider } from '../utils/StateProvider'
import { Outlet, Link } from "react-router-dom";

export default function Navbar({navBackground}) {
  const [{userInfo}] = useStateProvider()
  return (
    <Container navBackground={navBackground}>
      <div className="search_bar">
        <FaSearch />
        <input type="text" placeholder='Anything'/>
      </div>
      <div className="avatar">
        <nav>
          <Link to="/profile"><CgProfile /><span>{userInfo?.userName}</span></Link>
        </nav>
      </div>
      <div className="help">
        <Link to="/help">?</Link>
      </div>
    </Container>
  )
}

const Container = styled.div`
margin-left: 24px;
display: flex;
// justify-content: space-between;
align-items: center;
padding: 2rem;
height: 15rem;
// position: sticky;
top: 0;
transition: 0.3s ease-in-out;
background-color: ${({navBackground}) => navBackground ? "rgba(0, 10, 0, 0.7)" : "none"};
.search_bar {
  background-color: white;
  width: 30%;
  padding: 0.4rem 1rem;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  gap: 10px;
  input {
    border: none;
    height: 2rem;
    width: 100%;
    &:focus {
      outline: none;

    }
  }
} 
.avatar {
  margin-left:70%;
  background-color: black;
  padding: 0.3rem 0.4rem;
  padding-right: 1rem;
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    display: flex;
    justofy-content: center;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    color: white;
    font-weight: bold;
    svg {
      font-size: 1.3rem; 
      background-color: #282828;
      padding: 0.2rem;
      boreder-radius: 1rem;
      color: #c7c5c5;
      
    }
  }

}
.help{
  margin-left: 0.5%;
  background-color: black;
  padding: 0.3rem 0.4rem;
  padding-right: -1rem;
  border-radius: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    display: flex;
    justofy-content: center;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    color: white;
    font-weight: bold;
    svg {
      font-size: 1.3rem; 
      background-color: rgba(0, 10, 0, 0.7);
      padding: 0.2rem;
      boreder-radius: 1rem;
      color: #c7c5c5;
      
    }
  }
}
`;