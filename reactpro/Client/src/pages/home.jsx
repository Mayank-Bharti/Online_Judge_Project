import React, { useState, useEffect } from 'react';

const Home = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/api')
            .then(response => response.json())
            .then(data => setMessage(data.message))
            .catch(error => console.error('Error:', error));
    }, []);

    return <div>{message}</div>;
};

export default Home;
