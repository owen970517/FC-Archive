import React from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import Match from './components/matches/Match';
import { HelmetProvider } from 'react-helmet-async';
import Title from './common/Title';
import TeamList from './components/leagues/TeamList';
import TeamDetails from './components/leagues/TeamDetails';

function App() {
  return (
    <HelmetProvider>
      <Title/>
      <Outlet/>
    </HelmetProvider>
  );
}

export default App;
