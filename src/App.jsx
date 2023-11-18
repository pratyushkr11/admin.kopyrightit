// App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Applications from './Admin/Applications/Applications';

import AdminHome from './Admin/Home/AdminHome'


const App = () => {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AdminHome />}></Route>
        <Route path='/applications' element={<Applications />} />
        {/* <Route path='/profile' element={<Profile />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
