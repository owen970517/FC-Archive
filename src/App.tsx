import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/league' element={<TeamList/>}/>
          <Route path='/league/:teamid' element={<TeamDetails/>}/>
          <Route path='/search' element={<Match/>}/>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
