import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API_KEY = "d0ae83de32a46c56ef37b5365b3cb76e";

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
            className="text-white hover:bg-red-500 p-2 rounded mr-4"
          >
            Favorite
          </Link>
          <Link
            to={`/movie-popular`}
            className="text-white bg-blue-600 hover:bg-red-500 p-2 mr-4 rounded"
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

export default function PopularMovie() {
  const [movies, setMovies] = useState([]);
  const [language, setLanguage] = useState("");
  const [page, setPage] = useState("");
  const [region, setRegion] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const moviesPopular = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=${language}&page=${page}&region=${region}`,
        { headers: { accept: "application/json" } }
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setError(error.message);
    }
  };

  const handlePageChange = (event) => {
    const pageNumber = parseInt(event.target.value);
    if (!isNaN(pageNumber) && pageNumber > 0) {
      setPage(pageNumber);
    } else {
      setError("Invalid page number. Please enter a positive integer.");
    }
  };

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    if (selectedLanguage.match(/^[a-z]{2}-[A-Z]{2}$/)) {
      setLanguage(selectedLanguage);
    } else {
      setError(
        "Invalid language code. Please enter a valid language code (e.g., 'en-US')."
      );
    }
  };

  const handleRegionChange = (event) => {
    const selectedRegion = event.target.value;
    if (selectedRegion.match(/^[A-Z]{2}$/)) {
      setRegion(selectedRegion);
    } else {
      setError(
        "Invalid region code. Please enter a valid region code (e.g., 'SA')."
      );
    }
  };

  const handleShowPopularMovies = () => {
    if (language && page && region) {
      moviesPopular();
    } else if (region) {
      alert("Please select language and page.");
    } else if (page) {
      alert("Please select language and region.");
    } else if (language) {
      alert("Please select page and region.");
    } else if (language && page) {
      alert("Please select region.");
    } else if (language && region) {
      alert("Please select page");
    } else if (page && region) {
      alert("Please select language");
    } else {
      alert("Please select language, page, and region");
    }
  };

  useEffect(() => {
    if (language && page && region) {
      moviesPopular();
    }
  }, [language, page, region]);

  return (
    <div
      className="font-poppins"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <Navbar />
      <div className="mx-auto p-4">
        <h1 className="text-3xl text-center font-bold mt-7 mb-4">
          Popular Movies
        </h1>
        <div className="flex justify-center items-center mt-7 mb-4">
          <select
            className="border border-gray-300 rounded-md px-4 py-2 mr-4"
            onChange={handleLanguageChange}
          >
            <option selected disabled>
              Language
            </option>
            <option value="en-US">English</option>
            <option value="id-ID">Indonesian</option>
            <option value="ar-SA">Arabic</option>
          </select>
          <select
            className="border border-gray-300 rounded-md px-4 py-2 mr-4"
            onChange={handlePageChange}
          >
            <option selected disabled>
              Page
            </option>
            <option value="1">Page 1</option>
            <option value="2">Page 2</option>
            <option value="3">Page 3</option>
          </select>
          <select
            className="border border-gray-300 rounded-md px-4 py-2 mr-4"
            onChange={handleRegionChange}
          >
            <option selected disabled>
              All Regions
            </option>
            <option value="SA">Saudi Arabia</option>
            <option value="ID">Indonesia</option>
            <option value="EN">EN</option>
          </select>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-7 py-2 rounded-md focus:outline-none focus:ring"
            onClick={handleShowPopularMovies}
          >
            Show
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="border p-4 rounded-lg shadow-md cursor-pointer overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
              style={{ height: "100%" }}
            >
              <div
                className="bg-cover min-h-[250px] w-full rounded-t-md flex flex-col items-center pt-5 relative"
                onClick={() => {
                  navigate("/movie-detail", { state: { id: movie.id } });
                }}
              >
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
                <h2 className="font-bold px-5 text-xl mt-3 mb-2">
                  {movie.title}
                </h2>
                <h2 className="px-5 mb-2">
                  Release date: {movie.release_date}
                </h2>
                <h2 className="font-thin px-5 mb-2 text-justify">
                  {movie.overview.slice(0, 150)}...
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
