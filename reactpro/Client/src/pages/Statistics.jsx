import React from 'react';
import './Statistics.css';

const Statistics = ({ stats }) => {
    return (
        <div className="statistics">
            <div className="solved">
                <h3>{stats.solved}</h3>
                <p>Solved</p>
            </div>
            <div className="badges">
                <h3>{stats.badges}</h3>
                <p>Badges</p>
            </div>
            <div className="activity">
                <h3>Activity</h3>
                <div className="activity-chart">
                    {/* Add your activity chart here */}
                </div>
            </div>
        </div>
    );
};

export default Statistics;
