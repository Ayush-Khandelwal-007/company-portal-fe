import React, { useState, useEffect } from 'react';
import { Row, Col, Pagination, Spin } from 'antd';
import ProfileCard from '../Components/ProfileCard';
import SearchFilter from '../Components/SearchFilter';
import '../styles/explore.css';
import { fetchUsersWithFilters } from '../utils/functions';
import CONSTANTS from '../utils/constants';

const Explore = () => {
    const [userProfiles, setUserProfiles] = useState([]);
    const [totalUserProfiles, setTotalUserProfiles] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loadProfiles = () => {
            setIsLoading(true);
            const filters = JSON.parse(localStorage.getItem('filtersList') || "[]");
            fetchUsersWithFilters(currentPage, CONSTANTS.DEFAULT_PAGE_SIZE, filters)
                .then(data => {
                    setUserProfiles(data.results);
                    setTotalUserProfiles(data.totalPages);
                    setIsLoading(false);
                    if(data.totalPages < currentPage){
                        setCurrentPage(data.totalPages);
                    }
                })
                .catch(error => {
                    console.error('Error fetching profiles:', error);
                    setIsLoading(false);
                });
        };

        window.addEventListener('filter-storage', loadProfiles);
        loadProfiles();
        return () => window.removeEventListener('filter-storage', loadProfiles);
    }, [currentPage]);

    if (isLoading) {
        return <Spin size="large" fullscreen/>;
    }

    return (
        <div className="explore-container">
            <div className="search-bar">
                <SearchFilter />
            </div>
            <Row gutter={[24, 24]} justify="center">
                {userProfiles.map((profile, index) => (
                    <Col key={profile.userId} xs={24} sm={24} lg={12} xl={12}>
                        <ProfileCard profile={profile} />
                    </Col>
                ))}
            </Row>
            <Pagination
                current={currentPage}
                onChange={setCurrentPage}
                total={totalUserProfiles * CONSTANTS.DEFAULT_PAGE_SIZE}
                pageSize={CONSTANTS.DEFAULT_PAGE_SIZE}
                showSizeChanger={false}
            />
        </div>
    );
};

export default Explore;