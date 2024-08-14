import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Pagination, Empty } from 'antd';
import ProfileCard from '../Components/ProfileCard';
import '../styles/explore.css';
import { fetchProfilesByUserIds } from '../utils/api';

const ShortListed = () => {
    const [profiles, setProfiles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8; // Number of cards per page

    const fetchProfiles = useCallback(() => {
        const shortlistedUsers = JSON.parse(localStorage.getItem('shortlistedUsers')) || [];
        if (shortlistedUsers.length === 0) {
            setProfiles([]);
            setCurrentPage(1); // Reset to first page if no profiles are shortlisted
            return;
        }
        fetchProfilesByUserIds(shortlistedUsers)
            .then(data => {
                setProfiles(data.Users);
                // Check if the current page has any profiles after update
                if ((currentPage - 1) * pageSize >= data.Users.length) {
                    setCurrentPage(Math.max(1, Math.ceil(data.Users.length / pageSize)));
                }
            })
            .catch(error => console.error('Error:', error));
    }, [currentPage, pageSize]);

    useEffect(() => {
        window.addEventListener('storage', fetchProfiles);
        fetchProfiles();
        return () => {
            window.removeEventListener('storage', fetchProfiles);
        };
    }, [currentPage, fetchProfiles]);

    const handleChange = page => {
        setCurrentPage(page);
    };

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