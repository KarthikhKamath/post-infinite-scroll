// JobCard.jsx
import React, { useState } from 'react';
import './JobCard.css';

function JobCard({ job }) {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="job-card">
            <h2 className="job-title">{job.jobTitle}</h2>
            <p className="company-name"><strong>Company:</strong> {job.companyName}</p>
            <p className="location"><strong>Location:</strong> {job.location}</p>
            <p className="description">
                <strong>Description:</strong>
                {
                    job?.jobDetailsFromCompany?.slice(0, 100)}...

            </p>
            <p><strong>Experience Required:</strong> {job.minExp} - {job.maxExp} years</p>
            <button className="apply-button">Apply</button>
        </div>
    );
}

export default JobCard;
