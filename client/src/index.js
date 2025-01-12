import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Top10Restaurants from './Pages/Top10Restaurants';
import CoupsDeCoeur from './/Pages/CoupsDeCoeur';
import ErrorPage from './Pages/Error';
import Escapades from './Pages/Escapades';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/top-10-restaurants",
        element: <Top10Restaurants />,
      },
      {
        path: "/coups-de-coeur",
        element: <CoupsDeCoeur />,
      },
      {
        path: "/escapades",
        element: <Escapades />,
      }
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

