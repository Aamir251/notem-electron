import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/Authentication/Login';
import ErrorScreen from './Components/ErrorScreen';
import SignUp from './pages/Authentication/Signup';
import Authentication from './pages/Authentication';
import { AuthProvider } from './Context/AuthContext';
import Dashboard from './Components/Dashboard';
import Notebooks from './Components/Notebooks';
import AllNotes from './Components/AllNotes';
import { CacheProvider } from './Context/CacheContext';

const router = createBrowserRouter([
  // the root path consist of dashboard, if user is not logged in, 
  // we redirect to /auth/login
  {
    path : "/",
    element : <App />,
    errorElement : <ErrorScreen />,
    children : [
      {
        path : "/dashboard",
        element : <Dashboard />
      },
      {
        path : "/notebooks",
        element : <Notebooks />
      },
      {
        path : "/notesbooks/:notebookId/sections/:sectionId",
        element : <AllNotes />
      }
    ]
  },
  {
    path : "/auth",
    element : <Authentication />,
    children : [
      {
        path : "/auth/login",
        element : <Login />
      },
      {
        path : "/auth/signup",
        element : <SignUp />
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <AuthProvider>
        <CacheProvider>
          <RouterProvider router={router} />
        </CacheProvider>
      </AuthProvider>
  </React.StrictMode>
);