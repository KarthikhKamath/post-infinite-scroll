import React, { useState } from 'react';
import './JobCard.css';

// destructure the prop to use it in the current component
function JobCard({ job }) {

    // function to capitalize the first letter of the word
    const capitalized = (word) => {
        return word[0].toUpperCase() + word.slice(1);
    }

    // component
    return (
        <div className="job-card">
            <div className="postedDate">⏳ Posted 24 days ago</div>
            <div className="top">
                <img src={job.logoUrl} alt="Company Logo" className="company-logo" />
                <div className="top-left">
                    <p className="company-name"> {capitalized(job.companyName)}</p>
                    <p className="profile">{capitalized(job.jobRole)}</p>
                    <p className="location"> {capitalized(job.location)}</p>
                </div>
            </div>
            <p className="salary">Estimated Salary: {job.minJdSalary} {job.salaryCurrencyCode} ✅</p>
            <div className="description">
                <div className='aboutCompany'>About Company:</div>
                <div className='aboutUs'>About Us</div>
                <div className='info'>{`${job?.jobDetailsFromCompany?.slice(0, 500)}...`}</div>
                <div className="viewJob"><a href={job?.jdLink}>View Job</a></div>
            </div>
            <div className="experience"><strong>Minimum Experience</strong>
                <div className='minExp'> {job.minExp} - {job.maxExp} years</div>
            </div>

            <button className="apply-button">⚡ Easy Apply</button>
        </div>
    );
}

export default JobCard;
