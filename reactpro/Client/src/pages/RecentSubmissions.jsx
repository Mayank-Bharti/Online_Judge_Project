import React from 'react';
import './RecentSubmissions.css';

const RecentSubmissions = ({ submissions }) => {
    return (
        <div className="recent-submissions">
            <h3>Recent Submissions</h3>
            <ul>
                {submissions.map((submission, index) => (
                    <li key={index}>
                        {submission.title} - {new Date(submission.date).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecentSubmissions;
