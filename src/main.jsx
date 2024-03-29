import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./Home.jsx";
import MovieSearch from "./pages/searchMovie";
import MovieDetail from "./pages/detailMovie";
import TrendingMovie from "./pages/trendingMovies";
import PopularMovie from "./pages/PopularMovie";
import FavMovies from "./pages/FavMovies";
import NowPlaying from "./pages/movie";

//mengisiasi object router
const router = createBrowserRouter([
  {
    path: "/", //menentukan url
    element: <Home />, //komponen yang akan ditampilkan
  },
  {
    path: "/movie",
    element: <MovieSearch />,
  },
  {
    path: "/movie-detail",
    element: <MovieDetail />,
  },
  {
    path: "/movie-trending",
    element: <TrendingMovie />,
  },
  {
    path: "/movie-popular",
    element: <PopularMovie />,
  },
  {
    path: "/movie-favorite",
    element: <FavMovies />,
  },
  {
    path: "/movie-now",
    element: <NowPlaying />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
