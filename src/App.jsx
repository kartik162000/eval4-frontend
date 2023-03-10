/* eslint-disable react/react-in-jsx-scope */
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
