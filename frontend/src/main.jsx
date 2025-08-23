import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Teacher from './component/Teacher/Teacher.jsx';
import Student from './student/Student.jsx';
import CreateQuestion from './component/Teacher/CreateQuestion.jsx';
import StudentJoinPage from './student/StudentJoinPage.jsx';

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
        element:<CreateQuestion />
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
        // children:[
        //   {
        //     path:'/student',
        //     element:<StudentJoinPage />
        //   }
        // ]
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
