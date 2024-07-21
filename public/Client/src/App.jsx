import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Register from "./pages/register";
import Login from "./pages/login";
import Navbar from "./components/Navbar";
import ProblemDetail from "./pages/problem_detail";
import ProfilePage from "./pages/profile";

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api")
      .then((res) => res.json())
      .then((data) => setData(data.message))
      .catch((error) => console.log("Error fetching message:", error));
  }, []);

  return (
    <Router>
      <Navbar />
      {/* <div>
        {data ? <p>{data}</p> : <p>Loading...</p>}
      </div> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/problemDetail/:title" element={<ProblemDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />}/>
      </Routes>
    </Router>
  );
};

export default App;
