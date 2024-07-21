import React from 'react';
import './Languages.css';

const Languages = ({ languages }) => {
    return (
        <div className="languages">
            <h3>Languages</h3>
            <ul>
                {languages.map((lang, index) => (
                    <li key={index}>{lang.name}: {lang.solved} problems solved</li>
                ))}
            </ul>
        </div>
    );
};

export default Languages;
