import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import Match from './components/matches/Match';
import { HelmetProvider } from 'react-helmet-async';
import Title from './common/Title';

function App() {
  return (
    <HelmetProvider>
      <Title/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/search' element={<Match/>}/>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
