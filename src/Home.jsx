import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_KEY = "570c36d75740509c00d865a804d826a5";
const BASE_URL = "https://api.themoviedb.org/3/movie/now_playing";

const Navbar = () => {
  return (
    <div className="bg-gray-900">
      <nav className="container mx-auto flex items-center justify-between py-4">
        <div>
          <Link
            to={`/`}
            className="text-white bg-blue-600 hover:bg-red-500 p-2 rounded mr-4"
          >
            Home
          </Link>
          <Link
            to={`/movie-trending`}
            className="text-white  hover:bg-red-500 p-2 rounded mr-4"
          >
            Trending
          </Link>
          <Link
            to={`/movie-favorite`}
            className="text-white hover:bg-red-500 p-2 rounded mr-4"
          >
            Favorite
          </Link>
          <Link
            to={`/movie-popular`}
            className="text-white hover:bg-red-500 p-2 mr-4 rounded"
          >
            Popular
          </Link>
          <Link
            to={`/movie-now`}
            className="text-white hover:bg-red-500 p-2 rounded"
          >
            Now Playing
          </Link>
        </div>
        <div>
          <Link
            to={`/movie`}
            className="bg-blue-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded inline-block"
          >
            Cari Movie
          </Link>
        </div>
      </nav>
    </div>
  );
};

const Home = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNowPlayingMovies = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}?api_key=${API_KEY}&language=en-US&page=1`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchNowPlayingMovies();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8">
            Now Playing Movies
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {movies.slice(0, 5).map(
              (
                movie // Hanya 4 item yang ditampilkan
              ) => (
                <div
                  key={movie.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                  onClick={() =>
                    navigate("/movie-detail", { state: { id: movie.id } })
                  }
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    alt={movie.title}
                    className="w-[1000px] h-auto object-cover rounded-t-lg"
                  />
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-2">
                      {movie.title}
                    </h2>
                    <p className="text-gray-500 mb-4">
                      Release Date: {movie.release_date}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">
                        Rating: {movie.vote_average}
                      </span>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/movie-now"
              className="bg-gray-500 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded inline-block"
            >
              Lihat Semua Now Playing Movies
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
