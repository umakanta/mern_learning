import React from 'react';
import { Button } from 'antd';
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import { Profile } from './pages/Profile';
import { Admin } from './pages/Admin/Admin';
import Partner from './pages/Partner';

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/profile" element = {
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }/>
        <Route path="/admin" element = {
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }/>
        <Route path="/partner" element = {
          <ProtectedRoute>
            <Partner />
          </ProtectedRoute>
        }/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </BrowserRouter>
  </div>
);

export default App;