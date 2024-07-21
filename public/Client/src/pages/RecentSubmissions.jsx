import React from 'react';
import './RecentSubmissions.css';

const RecentSubmissions = ({ submissions }) => {
    return (
        <div className="recent-submissions">
            <h3>Recent Submissions</h3>
            <ul>
                {submissions.length > 0 ? (
                    submissions.map((submission, index) => {
                        // Check if submission.solvedAt is a valid date
                        const solvedAt = new Date(submission.solvedAt);
                        const formattedDate = solvedAt.toString() === 'Invalid Date' 
                            ? 'Date not available'
                            : `${solvedAt.toLocaleDateString()} ${solvedAt.toLocaleTimeString()}`;

                        return (
                            <li key={index}>
                                Problem: {submission.problem || 'Title not available'} - Solved At: {formattedDate}
                            </li>
                        );
                    })
                ) : (
                    <p>No recent submissions available.</p>
                )}
            </ul>
        </div>
    );
};

export default RecentSubmissions;
