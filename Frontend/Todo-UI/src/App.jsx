import React from 'react'
import Signup from './Components/Signup'
import Login from './Components/Login'
import TodosPage from './Components/TodosPage'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './App.css'

function App() {

  let router = createBrowserRouter([
    {
      path: '/',
      element: <Login/>,
      errorElement: <h1>404 ot found!</h1>
    },
    {
      path: '/login',
      element: <Login/>,    
    },
    {
      path: '/signup',
      element: <Signup/>,
    },
    {
      path: '/Todos',
      element: <TodosPage/>,
    }
  ])
  return (
    <>

      <RouterProvider router={router}></RouterProvider>

    </>
  )
}

export default App
