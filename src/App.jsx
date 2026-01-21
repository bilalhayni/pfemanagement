import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './components/forms/LoginForm';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  );
}

export default App;
