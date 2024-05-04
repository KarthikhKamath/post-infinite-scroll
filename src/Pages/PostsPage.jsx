import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PostPage.css';
import JobCard from '../Components/JobCard';

function PostsPage() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);

    useEffect(() => {
        getData();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const debounce = (func, delay) => {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    const handleScroll = debounce(() => {
        const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
        if (!loading && !loadingMore && scrollTop + clientHeight >= scrollHeight - 10) {
            console.log("Reached bottom of the page. Loading more data...");
            setLoadingMore(true);
            loadMoreData();
        }
    }, 200);

    const getData = async () => {
        setLoading(true);
        try {
            const response = await axios.post("https://api.weekday.technology/adhoc/getSampleJdJSON", {
                limit: 10,
                offset: (page - 1) * 10
            });
            console.log(response.data); // Log the response data
            setJobs(prevJobs => [...prevJobs, ...response.data.jdList]);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadMoreData = async () => {
        setPage(prevPage => prevPage + 1);
        try {
            const response = await axios.post("https://api.weekday.technology/adhoc/getSampleJdJSON", {
                limit: 10,
                offset: page * 10 // Update offset for next page
            });
            console.log(response.data); // Log the response data
            setJobs(prevJobs => [...prevJobs, ...response.data.jdList]);
        } catch (error) {
            console.error("Error fetching more data:", error);
        } finally {
            setLoadingMore(false); // Reset loadingMore flag after data is loaded
        }
    };

    return (
        <div className="posts-page">
            <div className="job-cards-container">
                {jobs.map((job, index) => (
                    <JobCard key={index} job={job} />
                ))}
            </div>
            {(loading || loadingMore) && <div className="loading-spinner"></div>}

        </div>
    );
}

export default PostsPage;
