import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Teacher from './Teacher/Teacher.jsx';
import Student from './student/Student.jsx';

const router=createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path:'/teacher',
    element:<Teacher />,
    children:[
      {
        path:'/teacher',
        element:<Teacher />
      }
    ]
  },
  {
    path:'/student',
    element:<Student />,
    children:[
      {
        path:'/student',
        element:<Student />,
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
