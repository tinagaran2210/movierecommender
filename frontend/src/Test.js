import React, { useState, useEffect } from "react";

const AddRatingForm = ({ selectedMovie, userID }) => {
  const [rating, setRating] = useState("");

  useEffect(() => {
    setRating("");
  }, [selectedMovie]);

  const handleClick = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/user/addratings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userID,
          movieId: selectedMovie.MOVIEID,
          rating: rating,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      alert("Rating added successfully");
    } catch (error) {
      console.error(error);
      alert("Error adding rating");
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="rating">Rating:</label>
        <input
          type="text"
          id="rating"
          value={rating}
          onChange={(event) => setRating(event.target.value)}
        />
      </div>
      <button onClick={handleClick}>Add Rating</button>
    </div>
  );
};

export default AddRatingForm;
