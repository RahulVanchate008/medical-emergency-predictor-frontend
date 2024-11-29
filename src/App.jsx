// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TrainModel from './components/TrainModel';
import TestModel from './components/TestModel';
import AppBar from '../src/components/AppBar/AppBar'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/train" element={<TrainModel />} />
        <Route path="/test" element={<TestModel />} />
      </Routes>
    </Router>
  );
};

export default App;
