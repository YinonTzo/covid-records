import React from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import logo from './logo.svg';
// import './App.css';

import { RegistrationPage } from './components/RegistrationPage';
import { SummaryPage } from './components/SummaryPage';
import { HeaderItem } from './components/HeaderItem';

export const App = () => {

  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HeaderItem />}>
            <Route path='registration' element={ <RegistrationPage /> }/>
            <Route path='summary' element={ <SummaryPage /> } />

            <Route path='/' element={<Navigate to='registration' replace />} />
            <Route path='*' element={<Navigate to='registration' replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

// export default App;
