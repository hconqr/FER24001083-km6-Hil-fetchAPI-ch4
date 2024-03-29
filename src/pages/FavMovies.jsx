import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// Define your API key and other constants here
const ACC_ID = "21134706";
const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MmIyYTUwMjUwZGUwYjczMDZiNzZhMzZjNTEwMjllOCIsInN1YiI6IjY2MDEyMzEyN2Y2YzhkMDE2MzZmZDQ4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.owhLgAWxk1jrcJHXp2KuqjPgImpP1fch2iCpz-dOLj8";

const Navbar = () => {
  return (
    <div className="bg-gray-900">
      <nav className="container mx-auto flex items-center justify-between py-4">
        <div>
          <Link
            to={`/`}
            className="text-white hover:bg-red-500 p-2 rounded mr-4"
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
            className="text-white bg-blue-600 hover:bg-red-500 p-2 rounded mr-4"
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

const FavMovies = () => {
  const [selectLanguage, setSelectLanguage] = useState("");
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const favMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/account/${ACC_ID}/favorite/movies?language=${selectLanguage}&page=1&sort_by=created_at.asc`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response.data ", response.data);
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    favMovies();
  };

  const handleLanguage = (event) => {
    setSelectLanguage(event.target.value);
  };

  return (
    <div>
      <h1 className="text-center my-10 font-bold text-2xl">Favorite Movie</h1>
      <div className="max-w-8xl mx-auto flex flex-col justify-center items-center gap-8 pb-24">
        <form onSubmit={handleSubmit}>
          <div className="mx-10 ml-14 mb-8">
            <select
              onChange={handleLanguage}
              defaultValue=""
              className="p-2 mr-4 border outline-none focus:border-blue-600 rounded-sm hover:shadow-lg"
            >
              <option value="" disabled hidden>
                Language
              </option>
              <option value="ar-SA">Arabic</option>
              <option value="en-US">English</option>
              <option value="id-ID">Indonesian</option>
            </select>
            <button
              type="submit"
              className="bg-blue-400 hover:bg-blue-600 text-black hover:text-white me-4 p-2 rounded-md border-double border-[3px]"
            >
              Submit
            </button>
          </div>
        </form>
        <div className="flex flex-wrap justify-center gap-8 pb-2">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="flex flex-col gap-y-3 max-w-[380px] min-w-[300px] max-sm:min-w-[250px] rounded-lg items-center border p-4  shadow-md cursor-pointer overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
              onClick={() => {
                navigate("/movie-detail", { state: { id: movie.id } });
              }}
            >
              <div className="bg-cover min-h-[250px] w-full rounded-t-md flex flex-col items-center pt-5 relative">
                <img
                  className="absolute -z-20 max-h-[250px] object-cover w-full top-0 left-0 filter blur-[3px]"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt=""
                />
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="max-w-44 rounded-sm"
                />
              </div>
              <h2>{movie.original_title}</h2>
              <h2 className="font-light m-1 mb-3 mx-4 text-justify">
                {movie.overview}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CombinedComponent = () => {
  return (
    <>
      <Navbar />
      <FavMovies />
    </>
  );
};

export default CombinedComponent;
