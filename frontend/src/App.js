// App.js
import React from "react";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignUpForm from './SignUpForm';
import MovieList from './MovieList';
import SimilarMovies from './SimilarMovies';
import Favorites from './Favorites';
import AdminLoginForm from './AdminLoginForm';
import AdminDashboard from './AdminDashboard';
import AdminUsers from './AdminUsers';
import AdminAdmins from './AdminAdmins';
import AddMovies from './AddMovies';
import AddUsers from './AddUsers';
import AddAdmins from './AddAdmins';

const router = createBrowserRouter([

  {
        path: "/",
        element: <LoginForm />,
  },
  {
        path: "signup",
        element: <SignUpForm />,
   },
   {
        path: "movie-list",
        element: <MovieList />,
   },

   {
       path: "recommended-movies",
       element: <SimilarMovies />,
   },

   {
       path: "favorites",
       element: <Favorites />,
    },

    {
       path: "admin-login",
       element: <AdminLoginForm />,
    },

    {
       path: "admin-dashboard",
       element: <AdminDashboard/>,
     },

    {
       path: "admin-user",
       element: <AdminUsers/>,
     },
     {
        path: "admin-admins",
        element: <AdminAdmins/>,
     },
     {
         path: "add-movies",
         element: <AddMovies/>,
     },
     {
         path: "add-users",
         element: <AddUsers/>,
     },
    {
         path: "add-admins",
         element: <AddAdmins/>,
     },

]);


const App = () => (
  <RouterProvider router={router} />
);

export default App;
