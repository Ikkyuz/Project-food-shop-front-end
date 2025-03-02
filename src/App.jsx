import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './pages/Menu';
import Order from './pages/Order';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import AddMenu from './pages/AddMenu';
import EditMenu from './pages/EditMenu';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/order" element={<Order />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/admin' element={<Admin />} />
          <Route path="/add" element={<AddMenu />} />
          <Route path="/edit/:id" element={<EditMenu />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
  )
}

export default App
