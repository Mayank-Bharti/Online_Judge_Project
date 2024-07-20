import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileHeader from './ProfileHeader';
import Statistics from './Statistics';
import CommunityStats from './CommunityStats';
import Languages from './Languages';
import Skills from './Skills';
import RecentSubmissions from './RecentSubmissions';
import './ProfilePage.css';

const ProfilePage = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/profile', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setUser(response.data.user);
            } catch (err) {
                setError('Error fetching profile data');
                console.error('Profile fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="profile-page">
            <ProfileHeader user={user} />
            <div className="main-content">
                <Statistics stats={{ 
                    problemsSolved: user.problemsSolved ? user.problemsSolved.length : 0, 
                    contestsParticipated: user.contestsParticipated ? user.contestsParticipated.length : 0 
                }} />
                <CommunityStats stats={user.communityStats} />
                <Languages languages={user.languages} />
                <Skills skills={user.skills} />
                <RecentSubmissions submissions={user.recentSubmissions || []} />
            </div>
        </div>
    );
};

export default ProfilePage;
