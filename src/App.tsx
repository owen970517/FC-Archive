import React from 'react';
import { Outlet} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Title from './common/Title';


function App() {
  return (
    <HelmetProvider>
      <Title/>
      <Outlet/>
    </HelmetProvider>
  );
}

export default App;
