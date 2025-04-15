import React from 'react'
import Header from './Components/Header'
import Signup from './Components/Signup'
import Login from './Components/Login'
import TodosPage from './Components/TodosPage'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <>
      <TodosPage></TodosPage>
    {/* <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/login" replace />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter> */}
    </>
  )
}

export default App
