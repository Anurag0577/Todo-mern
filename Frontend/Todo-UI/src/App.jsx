import React from 'react'
import Signup from './Components/Signup'
import Login from './Components/Login'
import TodosPage from './Components/TodosPage'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/login" replace />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/todos" element={<TodosPage />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
