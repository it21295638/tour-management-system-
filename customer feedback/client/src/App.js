import Header from "./components/FeedbackHeader";
import Button from "./components/Button";
import StarRating from "./components/StarRating";
import { useState, useEffect } from "react";
import axios from "axios";
import Table from "./components/Table";


function App() {
  const [efficiencyRating, setEfficiencyRating] = useState(0);
  const [speedRating, setSpeedRating] = useState(0);
  const [friendlinessRating, setFriendlinessRating] = useState(0);
  const [overallRating, setOverallRating] = useState(0);
  const [triggerGetPosts, setTriggerGetPosts] = useState(true);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (triggerGetPosts) {
      axios.get("http://localhost:8000/posts").then((res) => {
        if (res.status === 200) {
          setPosts(res.data.existingPosts);
          setTriggerGetPosts(false);
        }
      });
    }
  }, [triggerGetPosts]);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  function handleInputName(event) {
    const { name, value } = event.target;
    setMainobj((prevState) => ({
      ...prevState,
      fullName: value,
    }));
  }

  function handleInputEmail(event) {
    const { name, value } = event.target;
    setMainobj((prevState) => ({
      ...prevState,
      email: value,
    }));
  }
  function handleInputText(event) {
    const { name, value } = event.target;
    setMainobj((prevState) => ({
      ...prevState,
      comments: value,
    }));
  }

  const [mainObj, setMainobj] = useState({
    fullName: "",
    email: "",
    comments: "",
    efficiency: 0,
    speed: 0,
    friendliness: 0,
    overall: 0,
  });

  const handleStarClick = (numStars, name) => {
    switch (name) {
      case "efficiency":
        setEfficiencyRating(numStars);
        setMainobj((prevState) => ({
          ...prevState,
          efficiency: numStars,
        }));
        break;
      case "speed":
        setSpeedRating(numStars);
        setMainobj((prevState) => ({
          ...prevState,
          speed: numStars,
        }));
        break;
      case "friendliness":
        setFriendlinessRating(numStars);
        setMainobj((prevState) => ({
          ...prevState,
          friendliness: numStars,
        }));
        break;
      case "overall":
        setOverallRating(numStars);
        setMainobj((prevState) => ({
          ...prevState,
          overall: numStars,
        }));
        break;
      default:
        break;
    }
  };

  function handleSubmit() {
    console.log(mainObj);
    const hasAllProperties = [
      "fullName",
      "email",
      "overall",
      "efficiency",
      "speed",
      "friendliness",
    ].every((property) => {
      return mainObj[property] !== "";
    });
    if (hasAllProperties) {
      axios
        .post("http://localhost:8000/post/save", mainObj)
        .then((res) => {
          console.log(res);
          alert("Your feedback has been submitted!");
          setTriggerGetPosts(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Please fill the required fields");
    }
  }

  return (
    <div className="container">
      <Header />
      <br />
      <br />
      <p>Full name : </p>
      <input placeholder="name" name="name" onChange={handleInputName} />
      <br />
      <br />
      <p>Email : </p>
      <input placeholder="email" name="email" onChange={handleInputEmail} />
      <br />
      <br />
      <br />
      <p>The efficiency of the service : </p>
      <StarRating
        handleStarClick={handleStarClick}
        rating={efficiencyRating}
        name="efficiency"
      />
      <br />
      <p>The speed of the service : </p>
      <StarRating
        handleStarClick={handleStarClick}
        rating={speedRating}
        name="speed"
      />
      <br />
      <p>The friendliness of our staff : </p>
      <StarRating
        handleStarClick={handleStarClick}
        rating={friendlinessRating}
        name="friendliness"
      />
      <br />
      <p>Overall experience : </p>
      <StarRating
        handleStarClick={handleStarClick}
        rating={overallRating}
        name="overall"
      />
      <br />
      <p>Additional Comments : </p> <br />
      <textarea
        placeholder="Type your comment"
        name=""
        id=""
        cols="30"
        rows="10"
        onChange={handleInputText}
      ></textarea>
      <br />
      {/* <p>Additional comments:</p><Dialogue/> */}
      <Button text="Submit" onClick={handleSubmit} />
      <br />
      <br />
      <h2 className="header">Previous Feedback </h2>
      <Table posts={posts} triggerGetPosts={setTriggerGetPosts}/>
    </div>
  );
}

export default App;
