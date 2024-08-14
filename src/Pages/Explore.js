import React, { useState, useEffect } from 'react';
import { Row, Col, Pagination } from 'antd';
import ProfileCard from '../Components/ProfileCard';
import SearchFilter from '../Components/SearchFilter';
import '../styles/explore.css'
import { fetchUsersWithFilters } from '../utils/api';

const Explore = () => {
    const [profiles, setProfiles] = useState([]);
    const [totalProfiles, setTotalProfiles] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;

    useEffect(() => {
        const fetchProfiles = () => {
            const filtersList = localStorage.getItem('filtersList');
            const filters = JSON.parse(filtersList || "[]");
            fetchUsersWithFilters(currentPage, pageSize, filters)
                .then(data => {
                    setProfiles(data.results);
                    setTotalProfiles(data.totalPages);
                })
                .catch(error => console.error('Error fetching profiles:', error));
        }

        window.addEventListener('filter-storage', fetchProfiles);
        fetchProfiles();
        return () => {
            window.removeEventListener('filter-storage', fetchProfiles);
        };
    }, [currentPage]);

    const handleChange = page => {
        setCurrentPage(page);
    };

    return (
        <div className="explore-container">
            <div className="search-bar">
                <SearchFilter />
            </div>
            <Row gutter={[24, 24]} justify="center">
                {profiles?.map((profile, index) => (
                    <Col key={profile.userId} xs={24} sm={24} lg={12} xl={12}>
                        <ProfileCard profile={profile} />
                    </Col>
                ))}
            </Row>
            <Pagination
                current={currentPage}
                onChange={handleChange}
                total={totalProfiles * pageSize}
                pageSize={pageSize}
                showSizeChanger={false}
            />
        </div>
    );
};

export default Explore;