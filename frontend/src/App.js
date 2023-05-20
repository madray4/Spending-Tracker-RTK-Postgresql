import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// redux 
import { useSelector } from 'react-redux';

//components
import Navbar from './components/Navbar'

// pages
import Home from './pages/Home';
import CreateEntry from './pages/CreateEntry';
import EditEntry from './pages/EditEntry';
import Login from './pages/Login';
import Signup from './pages/Signup';

const App = () => {
  const { user } = useSelector(state => state.auth);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home/> : <Navigate to="/login"/>}
            />
            <Route
              path="/add-entry"
              element={user ? <CreateEntry/> : <Navigate to="/login"/>}
            />
            <Route
              path="/edit-entry/:id"
              element={user ? <EditEntry/> : <Navigate to="/login"/>}
            />
            <Route
              path="/login"
              element={!user ? <Login/> : <Navigate to="/"/>}
            />
            <Route
              path="/signup"
              element={!user ? <Signup/> : <Navigate to="/"/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;