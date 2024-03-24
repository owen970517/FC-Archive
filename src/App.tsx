import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import Match from './components/Match';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/search' element={<Match/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
