// src/Home.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    async function fetchProblems() {
      const response = await fetch('http://localhost:5000/api');
      const data = await response.json();
      setProblems(data);
    }

    fetchProblems();
  }, []);

  return (
    <div>
      <h1>DSA Problems</h1>
      <ul>
        {problems.map(problem => (
          <li key={problem.id}>
            <Link to={`/problemDetail/${problem.id}`}>{problem.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;


// export default Home;
