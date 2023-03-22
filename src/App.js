import React from 'react';
import Articles from './pages/Articles'
import Users from './pages/Users'
import Photos from './pages/Photos'
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route >
          <Route path="/" element={<Articles />} />
          <Route path="users" element={<Users />} />
          <Route path="photos" element={<Photos />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
