// App.js

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import { useStateProvider } from './utils/StateProvider';
import { reducerCases } from './utils/Constants';
import Sounds from './components/Sounds';
import Profile from './components/Profile';
import Help from './components/Help';
import { register } from './serviceWorkerRegistration';

function Home() {
  const [{ token }, dispatch] = useStateProvider();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      console.log('HASH', hash);
      const token = hash.substring(1).split('&')[0].split('=')[1];
      console.log(token);
      dispatch({ type: reducerCases.SET_TOKEN, token });
    }
  }, [token, dispatch]);

  return (
    <div>
      {token ? <Sounds /> : <Login />}
    </div>
  );
}

function App() {
  useEffect(() => {
    const registerServiceWorker = async () => {
      try {
        const registration = await navigator.serviceWorker.register('./service-worker.js');
        console.log('Service Worker registered with scope:', registration.scope);
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    };

    registerServiceWorker();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
