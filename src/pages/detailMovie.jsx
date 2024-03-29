import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import NoImage from "../assets/foto.png";

const API_KEY = "3d46ebf198dce59fc5e125d9ec59e72a";

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

export default function MovieDetail() {
  const location = useLocation();
  const [detail, setDetail] = useState(null);
  const [reviews, setReviews] = useState([]);

  function limitWord(text, limit) {
    const words = text.split(/\s+/); // Split teks berdasarkan spasi
    const slicedText = words.slice(0, limit).join(" "); // Ambil hanya jumlah kata sesuai limit
    return slicedText + (words.length > limit ? "..." : ""); // Tambahkan elipsis jika jumlah kata melebihi limit
  }

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${location.state.id}?language=en-US&api_key=${API_KEY}`,
          { headers: { accept: "application/json" } }
        );
        console.log("responsen data id detail", response.data.id);
        setDetail(response.data);
      } catch (error) {
        console.error("Error fetching detail data: ", error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${location.state.id}/reviews?language=en-US&page=1&api_key=${API_KEY}`,
          { headers: { accept: "application/json" } }
        );
        setReviews(response.data.results);
      } catch (error) {
        console.error("Error fetching reviews: ", error);
      }
    };

    fetchDetail();
    fetchReviews();
  }, [location.state.id]);

  return (
    <>
      <Navbar />
      <div className="mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="flex flex-col lg:flex-row p-5">
            <div className="flex-1 flex justify-center items-center mt-8 lg:mt-0">
              <img
                src={`https://image.tmdb.org/t/p/w500/${detail?.poster_path}`}
                alt={detail?.title}
                className="w-auto max-h-96 rounded-lg"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-2 text-blue-900">
                {detail?.title}
              </h2>
              <h2 className="text-gray-600 mb-2">
                Release date: {detail?.release_date}
              </h2>
              <h2 className="mb-2">Status: {detail?.status}</h2>
              <h2 className="mb-2">Popularity: {detail?.popularity} viewers</h2>
              <h2 className="mb-2">Runtime: {detail?.runtime} minutes</h2>
              <p className="text-gray-800 mb-4">{detail?.overview}</p>
            </div>
          </div>

          <div className="mt-8 p-4">
            <h3 className="text-3xl font-bold mb-2 text-blue-900 text-center">
              Reviews {detail?.title}
            </h3>
            {reviews.length === 0 ? (
              <p className="text-gray-700 italic text-center text-l">
                Belum ada review pada film {detail?.title}
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {reviews.map((review, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 rounded-lg shadow-md p-4"
                  >
                    <h4 className="text-xl font-semibold mb-2">
                      {review.author}
                    </h4>
                    <img
                      src={
                        review.author_details.avatar_path
                          ? `https://image.tmdb.org/t/p/w500/${review.author_details.avatar_path}`
                          : NoImage // Ganti dengan path gambar default Anda
                      }
                      alt={`Avatar of ${review.author}`}
                      className="w-16 h-16 rounded-full mb-2"
                    />
                    <p className="text-lg mb-2">
                      Rating:
                      {review.author_details.rating
                        ? review.author_details.rating
                        : 0}
                      / 10
                    </p>
                    <p className="text-lg mb-2">
                      Created at: {review.created_at}
                    </p>
                    <p className="text-gray-700">
                      {limitWord(review.content, 50)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
