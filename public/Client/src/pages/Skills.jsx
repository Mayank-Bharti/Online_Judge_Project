import React from 'react';
import './Skills.css';

const Skills = ({ skills }) => {
    return (
        <div className="skills">
            <h3>Skills</h3>
            <ul>
                {skills.map((skill, index) => (
                    <li key={index}>{skill.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Skills;
