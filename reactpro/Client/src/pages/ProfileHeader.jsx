import React from 'react';
import './ProfileHeader.css';

const ProfileHeader = ({ user }) => {
    return (
        <div className="profile-header">
            <div className="profile-picture"></div>
            <div className="profile-info">
                <h2>{user.username}</h2>
                <p>Rank: {user.rank}</p>
                <p>Organisation:{user.organisation}</p>
                <button>Edit Profile</button>
            </div>
        </div>
    );
};

export default ProfileHeader;
