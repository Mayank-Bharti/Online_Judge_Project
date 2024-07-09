// src/Home.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [problemGroups, setProblemGroups] = useState([]);

  useEffect(() => {
    async function fetchProblems() {
      const response = await fetch('http://localhost:5000/api');
      const data = await response.json();
      setProblemGroups(data);
    }

    fetchProblems();
  }, []);

  return (
    <div>
      <h1>DSA Problems</h1>
      {problemGroups.map(group => (
        <div key={group.id}>
          <h2> {group.number}. {group.type} </h2>
          <ul>
            {group.problems.map((problem, index) => (
              <li key={problem.title}>
                <Link to={`/problemDetail/${problem.title}`}>{problem.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Home;
