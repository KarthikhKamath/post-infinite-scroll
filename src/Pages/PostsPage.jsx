// PostsPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PostPage.css';
import JobCard from '../Components/JobCard'; // Import the JobCard component

function PostsPage() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        setLoading(true);
        try {
            const response = await axios.post("https://api.weekday.technology/adhoc/getSampleJdJSON", {
                limit: 10,
                offset: (page - 1) * 10
            });
            console.log(response.data)
            setJobs(prevJobs => [...prevJobs, ...response.data.jdList]);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }

    const loadMoreData = () => {
        setPage(prevPage => prevPage + 1);
    };

    useEffect(() => {
        if (page > 1) {
            getData();
        }
    }, [page]);

    return (
        <div className="posts-page">
            <div className="job-cards-container">
                {jobs.map((job, index) => (
                    <JobCard key={index} job={job} />
                ))}
            </div>
            {loading && <div className="loading">Loading...</div>}
            <button className="load-more-button" onClick={loadMoreData}>Load More</button>
        </div>
    );
}

export default PostsPage;
