import React, { useState, useEffect } from "react";
import axios from "axios";

const BooksList = () => {

  const [images, setImages] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      fetchImages();
    }
  }, [isLoggedIn]);

  const fetchImages = async () => {
    try {
      const response = await axios
        .get(
          "https://www.googleapis.com/books/v1/volumes?q=react&key=AIzaSyB70zb22yfJ8JxXcJHTKJKR9xQKq4UxIHw&maxResults=40"
        )
        .then((response) => setImages(response.data.items));
    } catch (error) {
      console.error("Error fetching images:", error);
      setError("Failed to fetch images. Please try again.");
    }
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    if (!validateEmail(username)) {
      setError("Invalid email address.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-950 to-gray-900">
        <form
          onSubmit={handleLogin}
          className="bg-purple-900 p-10 rounded-lg shadow-lg max-w-md w-full"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-white">
            Welcome
          </h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Email"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="container max-w-max p-8 bg-gray-900 min-h-screen">
      <h1 className="text-5xl text-center mb-10 font-bold text-white">
        React Books Gallery
      </h1>
      {error && <p className="text-red-500 text-center mb-6">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {images.map((item, index) => {
          const thumbnail =
            item.volumeInfo.imageLinks &&
            item.volumeInfo.imageLinks.smallThumbnail;
          return (
            <div
              key={index}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
            >
              <img
                src={thumbnail}
                alt="book cover"
                className="w-11/12 h-96 object-cover mx-auto mt-5 rounded"
              />
              <div className="p-4 text-center text-white">
                <h3 className="font-semibold text-lg">
                  {item.volumeInfo.title}
                </h3>
                <p className="text-sm text-gray-400 mt-2">
                  {item.volumeInfo.authors?.join(", ")}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BooksList;
