/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_KEY = "3d46ebf198dce59fc5e125d9ec59e72a";

const MovieSearch = () => {
  const [query, setQuery] = useState("avenger");
  const [selectYear, setSelectYear] = useState("");
  const [language, setLanguage] = useState("");
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  function limitWord(text, limit) {
    const words = text.split(/\s+/); // Split teks berdasarkan spasi
    const slicedText = words.slice(0, limit).join(" "); // Ambil hanya jumlah kata sesuai limit
    return slicedText + (words.length > limit ? "..." : ""); // Tambahkan elipsis jika jumlah kata melebihi limit
  }

  const searchMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}&include_adult=false&language=${language}&page=1&year=${selectYear}&region=EN`,
        { headers: { accept: "application/json" } }
      );
      console.log("response.data", response.data);
      setMovies(response.data.results);
    } catch (error) {
      console.log("Error fecthing data: ", error);
    }
  };

  const handleChangeQuery = (event) => {
    setQuery(event.target.value);
  };

  const handleYear = (event) => {
    setSelectYear(event.target.value);
  };

  const handleChangeLanguage = (event) => {
    const selectedLanguage = event.target.value; // Ambil nilai bahasa yang dipilih
    setLanguage(selectedLanguage); // Set state bahasa dengan nilai yang dipilih
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    searchMovies();
  };

  useEffect(() => {
    searchMovies();
  }, []);
  return (
    <div className="items-center justify-center h-screen bg-landing">
      <div className="flex flex-col items-center justify-center h-screen">
        <h1
          className="text-3xl font-bold mb-4 text-white"
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
        >
          Movie Search
        </h1>
        <form onSubmit={handleSubmit} className="mb-4 w-full max-w-lg">
          <div className="flex items-center border-b-2 border-blue-500 py-2">
            <input
              type="text"
              placeholder="Search for a movie"
              value={query}
              onChange={handleChangeQuery}
              className="text-white appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none"
              style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}
            />
            <select
              onChange={handleYear}
              className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
              style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}
            >
              <option>Rentan Tahun</option>
              <option value="2021">1900 - 2021</option>
              <option value="2022">1900 - 2022</option>
              <option value="2023">1900 - 2023</option>
            </select>
            <select
              value={language}
              onChange={handleChangeLanguage}
              className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
              style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}
            >
              <option value="">Pilih Bahasa</option>
              <option value="en">English</option>
              <option value="id">Indonesia</option>
            </select>

            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-landing">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
          >
            <div>
             
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className="rounded-md"
              />
               <h2 className="text-gray-600 mb-2">
                Release Date: {movie.release_date}
              </h2>
              <p className="text-gray-700">
                    {limitWord(movie.overview, 20)}
                  </p>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => {
                  navigate("/movie-detail", { state: { id: movie.id } });
                }}
                className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-4 w-72 text-center transition duration-300 ease-in-out transform hover:scale-105"
              >
                Detail {movie.title}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;
