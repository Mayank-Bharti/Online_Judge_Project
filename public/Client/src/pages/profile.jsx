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
                const token = localStorage.getItem('token');
                if (!token) {
                    setIsAuthenticated(false);
                    return;
                }
                const response = await axios.get('http://localhost:5000/api/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUser(response.data.user);
            } catch (err) {
                setError(' please login your account...');
                console.error('Profile fetch error:', err);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);
    const handleSignOut = () => {
        // Clear localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        
        // Redirect to login page
        window.location.href = '/login';
    };
    

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
            <button className="signout-button" onClick={handleSignOut}>Sign Out</button>
        </div>
    );
};

export default ProfilePage;
