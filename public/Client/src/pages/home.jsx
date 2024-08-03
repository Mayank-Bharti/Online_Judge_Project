// src/Home.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './home.css'

function Home() {
  const [problemGroups, setProblemGroups] = useState([]);

  useEffect(() => {
    async function fetchProblems() {
      const response = await fetch('https://online-judge-project-backend.onrender.com');
      const data = await response.json();
      setProblemGroups(data);
    }

    fetchProblems();
  }, []);

  return (
    <div id='home'>
      <h1>DSA Problems</h1>
      {problemGroups.map(group => (
        <div key={group.id}>
          <h2> {group.number}. {group.type} </h2>
          <ul>
            {group.problems.map((problem) => (
              <li key={problem.title}>
                <Link to={`/api/problemDetail/${problem.title}`}>{problem.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Home;
