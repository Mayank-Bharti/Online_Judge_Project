import React from 'react';
import './CommunityStats.css';

const CommunityStats = ({ stats }) => {
    return (
        <div className="community-stats">
            <h3>Community Stats</h3>
            <p>Views: {stats.views}</p>
            <p>Solutions: {stats.solutions}</p>
            <p>Discuss: {stats.discuss}</p>
            <p>Reputation: {stats.reputation}</p>
        </div>
    );
};

export default CommunityStats;
