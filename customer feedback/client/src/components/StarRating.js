import { useState } from "react";

function StarRating({ name, handleStarClick, rating }) {
  return (
    <div>
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={i < rating ? "filled" : ""}
          onClick={() => handleStarClick(i + 1, name)}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default StarRating;
