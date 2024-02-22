import React from "react";
import Button from "./Button";
import axios from "axios";

const Table = ({ posts, triggerGetPosts }) => {
  const getRating = (numOfStars) => {
    switch (numOfStars) {
      case 1:
        return "Very poor";
      case 2:
        return "Poor";
      case 3:
        return "Neutral";
      case 4:
        return "Good";
      case 5:
        return "Excellent";
      default:
        return "Unrated";
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/post/delete/${id}`).then(() => {
      triggerGetPosts(true);
      setTimeout(() => {
        alert("Feeback deleted!");
      }, 1);
    });
  };

  return (
    <div className="tablecontainer">
      <div >
        {posts?.map((item) => (
          <>
            <div className="tablebox" >
              <div>Full name : {item.fullName}</div>
              <div>Email : {item.email}</div>
              <div>Effiency rating : {getRating(item.efficiency)}</div>
              <div>Speed rating : {getRating(item.speed)}</div>
              <div>Friendliness rating : {getRating(item.friendliness)}</div>
              <div>Overall rating : {getRating(item.overall)}</div>
              {item.comments !== "" && (
                <>
                  <div>Additional comments :</div>
                  <div>{item.comments}</div>
                </>
              )}
              <Button text="Delete" onClick={() => handleDelete(item._id)} />
            </div>
            <br />
            <br />
          </>
        ))}
      </div>
    </div>
  );
};

export default Table;
