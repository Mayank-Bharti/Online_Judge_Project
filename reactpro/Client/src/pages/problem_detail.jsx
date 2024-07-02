// src/ProblemDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
 import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';

function ProblemDetail() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  useEffect(() => {
    async function fetchProblemDetail() {
      const response = await fetch(`http://localhost:5000/api/problemDetail/${id}`);
      const data = await response.json();
      setProblem(data);
    }

    fetchProblemDetail();
  }, [id]);

  const handleRunCode = async () => {
    const response = await fetch('http://localhost:5000/api/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    const result = await response.json();
    setOutput(result.output);
  };

  if (!problem) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{problem.title}</h1>
      <p>{problem.description}</p>
      <CodeMirror
        value={code}
        options={{
          mode: 'javascript',
          theme: 'material',
          lineNumbers: true,
        }}
        onBeforeChange={(editor, data, value) => {
          setCode(value);
        }}
      />
      <button onClick={handleRunCode}>Run Code</button>
      <div>
        <h2>Output:</h2>
        <pre>{output}</pre>
      </div>
    </div>
  );
}

export default ProblemDetail;
