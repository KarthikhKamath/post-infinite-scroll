import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PostPage.css';
import JobCard from '../Components/JobCard';
import Select from 'react-select';

function PostsPage() {
    // State variables for managing jobs data, loading status, infinite scroll, filters, and search term
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [experienceFilter, setExperienceFilter] = useState(null);
    const [roleFilter, setRoleFilter] = useState(null);
    const [basePayFilter, setBasePayFilter] = useState(null);
    const [locationFilter, setLocationFilter] = useState(null);
    const [workTypeFilter, setWorkTypeFilter] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch data when component mounts and set up scroll event listener
    useEffect(() => {
        getData();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // function to throttle scroll event listener
    const debounce = (func, delay) => {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    // Handle scroll event to load more data when user reaches bottom of page
    const handleScroll = debounce(() => {
        const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
        if (!loading && !loadingMore && scrollTop + clientHeight >= scrollHeight - 10) {
            setLoadingMore(true);
            loadMoreData();
        }
    }, 200);

    // Fetch initial data
    const getData = async () => {
        setLoading(true);
        try {
            const response = await axios.post("https://api.weekday.technology/adhoc/getSampleJdJSON", {
                limit: 10,
                offset: (page - 1) * 10
            });
            setJobs(prevJobs => [...prevJobs, ...response.data.jdList]);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    // Load more data when user scrolls to bottom
    const loadMoreData = async () => {
        setPage(prevPage => prevPage + 1);
        try {
            const response = await axios.post("https://api.weekday.technology/adhoc/getSampleJdJSON", {
                limit: 10,
                offset: page * 10
            });
            setJobs(prevJobs => [...prevJobs, ...response.data.jdList]);
        } catch (error) {
            console.error("Error fetching more data:", error);
        } finally {
            setLoadingMore(false);
        }
    };

    // Event handlers for dropdown filters
    const handleExperienceChange = (selectedOption) => {
        setExperienceFilter(selectedOption ? selectedOption.value : null);
    };

    const handleRoleChange = selectedOption => {
        setRoleFilter(selectedOption ? selectedOption.value : null);
    };

    // Filter jobs based on selected filters and search term
    const filteredJobs = jobs.filter(job =>
        (!experienceFilter || job.minExp <= experienceFilter) &&
        (!roleFilter || job.jobRole.toLowerCase().includes(roleFilter)) &&
        (!basePayFilter || job.minJdSalary > basePayFilter) &&
        (!locationFilter || job.location.toLowerCase() === locationFilter.toLowerCase()) &&
        (!workTypeFilter || (workTypeFilter === 'remote' && job.location.toLowerCase().includes('remote')) ||
            (workTypeFilter === 'onsite' && !job.location.toLowerCase().includes('remote'))) &&
        (searchTerm === '' || job.companyName.toLowerCase().includes(searchTerm.toLowerCase()))
    );


    // Dropdown options for locations
    const locations = [
        { value: "Bangalore", label: "Bangalore" },
        { value: "Mumbai", label: "Mumbai" },
        { value: "Delhi NCR", label: "Delhi NCR" },
        { value: "Chennai", label: "Chennai" },
        { value: "Kolkata", label: "Kolkata" },
        { value: "Hyderabad", label: "Hyderabad" }
    ]

    // Options for role dropdown grouped by category
    const roleOptions = [
        {
            label: "Engineering",
            options: [
                { value: "backend", label: "Backend" },
                { value: "frontend", label: "Frontend" },
                { value: "fullstack", label: "Fullstack" },
                { value: "ios", label: "IOS" },
                { value: "flutter", label: "Flutter" },
                { value: "react native", label: "React Native" },
                { value: "android", label: "Android" },
                { value: "tech lead", label: "Tech Lead" },
                { value: "dev-ops", label: "Dev-ops" },
                { value: "data engineer", label: "Data Engineer" },
                { value: "data science", label: "Data Science" },
                { value: "computer vision", label: "Computer Vision" },
                { value: "test", label: "Test" },
                { value: "qa", label: "QA" },
                { value: "web3", label: "Web3" },
                { value: "deep learning", label: "Deep Learning" },
                { value: "sre", label: "Sre" },
                { value: "data-infrastructure", label: "Data-Infrastructure" }
            ]
        },
        {
            label: "Design",
            options: [
                { value: "designer", label: "Designer" },
                { value: "design manager", label: "Design Manager" },
                { value: "graphic designer", label: "Graphic Designer" },
                { value: "product designer", label: "Product Designer" }
            ]
        },
        {
            label: "Product",
            options: [
                { value: "operations manager", label: "Operations Manager" },
                { value: "founders office", label: "Founders Office" },
                { value: "chief of staff", label: "Chief of Staff" }
            ]
        },
        {
            label: "Sales",
            options: [
                { value: "sales development representative", label: "Sales Development Representative" },
                { value: "account executive", label: "Account Executive" },
                { value: "account manager", label: "Account Manager" }
            ]
        },
        {
            label: "Marketing",
            options: [
                { value: "digital marketing manager", label: "Digital Marketing Manager" },
                { value: "growth hacker", label: "Growth Hacker" },
                { value: "marketing", label: "Marketing" },
                { value: "product marketing manager", label: "Product Marketing Manager" }
            ]
        },
        {
            label: "Other Engineering",
            options: [
                { value: "hardware", label: "Hardware" },
                { value: "mechanical", label: "Mechanical" },
                { value: "systems", label: "Systems" }
            ]
        },
        {
            label: "Business Analyst",
            options: [
                { value: "business analyst", label: "Business Analyst" }
            ]
        },
        {
            label: "Data Analyst",
            options: [
                { value: "data analyst", label: "Data Analyst" }
            ]
        },
        {
            label: "Project Manager",
            options: [
                { value: "project manager", label: "Project Manager" }
            ]
        },
        {
            label: "Management",
            options: [
                { value: "management", label: "Management" }
            ]
        },
        {
            label: "Legal",
            options: [
                { value: "legal", label: "Legal" }
            ]
        },
        {
            label: "HR",
            options: [
                { value: "hr", label: "HR" }
            ]
        },
        {
            label: "Finance",
            options: [
                { value: "finance", label: "Finance" }
            ]
        }
    ];

    // Dropdown options for experience levels
    const experienceOptions = [
        { value: 1, label: '1 year' },
        { value: 2, label: '2 years' },
        { value: 3, label: '3 years' },
        { value: 4, label: '4 years' },
        { value: 5, label: '5 years' },
        { value: 6, label: '6 years' },
        { value: 7, label: '7 years' },
        { value: 8, label: '8 years' },
        { value: 9, label: '9 years' },
        { value: 10, label: '10 years' }
    ];

    // Dropdown options for base pay
    const basePay = [
        { value: 0, label: '0 USD' },
        { value: 10, label: '10 USD' },
        { value: 20, label: '20 USD' },
        { value: 30, label: '30 USD' },
        { value: 40, label: '40 USD' },
        { value: 50, label: '50 USD' },
        { value: 60, label: '60 USD' },
        { value: 70, label: '70 USD' },
        { value: 80, label: '80 USD' },
        { value: 90, label: '90 USD' },
        { value: 100, label: '100 USD' }
    ]

    // component
    return (
        <div className="posts-page">
            <div className="filter-container">
                <Select
                    className="select"
                    placeholder="Experience"
                    isClearable
                    onChange={handleExperienceChange}
                    options={experienceOptions}
                />
                <Select
                    className="select"
                    placeholder="Roles"
                    isClearable
                    onChange={handleRoleChange}
                    options={roleOptions}
                    formatGroupLabel={data => (
                        <div style={{ fontWeight: 'bold', fontSize: '1em' }}>
                            {data.label}
                        </div>
                    )}
                />

                <Select
                    className="select"
                    placeholder="Min base pay"
                    isClearable
                    onChange={option => setBasePayFilter(option ? option.value : null)}
                    options={basePay}
                />
                <Select
                    className="select"
                    placeholder="Select Location"
                    isClearable
                    onChange={option => setLocationFilter(option ? option.value : null)}
                    options={locations}
                />
                <Select
                    className="select"
                    placeholder="Work Type"
                    isClearable
                    onChange={option => setWorkTypeFilter(option ? option.value : null)}
                    options={[
                        { value: "remote", label: "Remote" },
                        { value: "onsite", label: "Onsite" }
                    ]}
                />
                <input
                    type="text"
                    className="inputSearch"
                    placeholder="Search by Company Name"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    style={{ marginBottom: '10px' }}
                />

            </div>
            <div className="job-cards-container">
                {/* // map through filtered object and send the data as props to the card element component */}
                {filteredJobs.length > 0 ? (
                    filteredJobs.map((job, index) => <JobCard key={index} job={job} />)
                ) : (
                    <div className="no-jobs-message">No jobs found.</div>
                )}
            </div>
            {/* //loading animation  */}
            {(loading || loadingMore) && <div className="loading-spinner"></div>}
        </div>
    );
}

export default PostsPage;
