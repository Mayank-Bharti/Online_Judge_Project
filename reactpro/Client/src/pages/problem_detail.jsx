// src/ProblemDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProblemDetail.css';

function ProblemDetail() {
  const { title } = useParams();
  const [problem, setProblem] = useState(null);
  const [language, setLanguage] = useState('cpp');
  const [code, setCode] = useState('');
  const [inputs, setInputs] = useState(''); // Added state for inputs
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProblemDetail() {
      if (!title) {
        console.error('No title parameter found in URL');
        return;
      }
      try {
        const response = await fetch(`http://localhost:5000/api/problemDetail/${title}`);
        if (response.ok) {
          const data = await response.json();
          setProblem(data);
        } else {
          console.error(`Problem detail not found for title: ${title}`);
        }
      } catch (error) {
        console.error('Error fetching problem details:', error);
      } finally {
        setLoading(false);
      }
    }

    if (title) {
      fetchProblemDetail();
    } else {
      console.error('No title parameter found in URL');
      setLoading(false);
    }
  }, [title]);

  const handleRunCode = async () => {
    setError(''); // Clear previous error
    setOutput(''); // Clear previous output

    try {
      const response = await fetch('http://localhost:5000/api/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language, input: inputs }), // Included inputs in the request body
      });

      const result = await response.json();

      if (response.ok) {
        setOutput(result.output);
      } else {
        setError(result.error || 'An unknown error occurred.');
      }
    } catch (error) {
      setError('An error occurred while running the code.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!problem) {
    return <div>Problem not found</div>;
  }

  return (
    <div className="problem-detail">
      <h1>{problem.title}</h1>
      <p>{problem.description}</p>
      <div className="example-section">
        <p><strong>Example Input:</strong> {problem.exampleInput}</p>
        <p><strong>Example Output:</strong> {problem.exampleOutput}</p>
      </div>
      <p><strong>Difficulty:</strong> {problem.difficulty}</p>
      <div className="language-selector">
        <label>Language: </label>
        <select
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
          }}
        >
          <option value="cpp">C++</option>
          <option value="py">Python</option>
        </select>
      </div>
      <div className="code-editor-container">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="code-editor"
          placeholder="Write your code here..."
        ></textarea>
      </div>
      <div className="input-editor-container">
        <textarea
          value={inputs}
          onChange={(e) => setInputs(e.target.value)} // Added input field
          className="input-editor"
          placeholder="Enter your inputs here..."
        ></textarea>
      </div>
      <div className="button-container">
        <button className="run-code-button" onClick={handleRunCode}>Run Code</button>
      </div>
      {error && (
        <div className="error-message">
          <h2>Error:</h2>
          <pre>{typeof error === 'object' ? JSON.stringify(error, null, 2) : error}</pre>
        </div>
      )}
      <div className="output-container">
        <h2>Output:</h2>
        <pre>{output}</pre>
      </div>
    </div>
  );
}

export default ProblemDetail;
