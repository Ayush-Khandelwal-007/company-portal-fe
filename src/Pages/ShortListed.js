import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Pagination, Empty, Spin } from 'antd';
import ProfileCard from '../Components/ProfileCard';
import '../styles/explore.css';
import { fetchProfilesByUserIds } from '../utils/functions';

const ShortListed = () => {
    const [profiles, setProfiles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;
    const [isLoading, setIsLoading] = useState(false);

    const fetchProfiles = useCallback(() => {
        setIsLoading(true);
        const shortlistedUsers = JSON.parse(localStorage.getItem('shortlistedUsers')) || [];
        if (shortlistedUsers.length === 0) {
            setProfiles([]);
            setCurrentPage(1); 
            setIsLoading(false); 
            return;
        }
        fetchProfilesByUserIds(shortlistedUsers)
            .then(data => {
                setProfiles(data.Users);
                adjustCurrentPage(data.Users.length);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setIsLoading(false);
            });
    }, [currentPage, pageSize]);

    const adjustCurrentPage = (totalProfiles) => {
        if ((currentPage - 1) * pageSize >= totalProfiles) {
            setCurrentPage(Math.max(1, Math.ceil(totalProfiles / pageSize)));
        }
    };

    useEffect(() => {
        window.addEventListener('storage', fetchProfiles);
        fetchProfiles();
        return () => window.removeEventListener('storage', fetchProfiles);
    }, [currentPage, fetchProfiles]);

    const handleChange = page => {
        setCurrentPage(page);
    };

    if (isLoading) {
        return <Spin size="large" fullscreen/>; // Display loading indicator
    }

    return profiles.length > 0 ? (
        <div className="explore-container">
            <Row gutter={[24, 24]} justify="center">
                {profiles.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((profile, index) => (
                    <Col key={profile.userId} xs={24} sm={24} lg={12} xl={12}>
                        <ProfileCard profile={profile} handleUpdateShortlist={fetchProfiles}/>
                    </Col>
                ))}
            </Row>
            {profiles.length > pageSize && (
                <Pagination
                    current={currentPage}
                    onChange={handleChange}
                    total={profiles.length}
                    pageSize={pageSize}
                    showSizeChanger={false}
                />
            )}
        </div>
    ) : (
        <div className='empty-container'>
            <Empty description="No shortlisted profiles" />
        </div>
    );
};

export default ShortListed;