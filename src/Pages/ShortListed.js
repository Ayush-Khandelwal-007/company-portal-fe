import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Pagination, Empty, Spin } from 'antd';
import ProfileCard from '../Components/ProfileCard';
import '../styles/explore.css';
import { fetchProfilesByUserIds } from '../utils/functions';
import CONSTANTS from '../utils/constants';

const ShortListed = () => {
    const [profiles, setProfiles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const filterProfiles = useCallback(() => {
        const shortlistedUsers = JSON.parse(localStorage.getItem('shortlistedUsers')) || [];
        const adjustCurrentPage = (totalProfiles) => {
            if ((currentPage - 1) * CONSTANTS.DEFAULT_PAGE_SIZE >= totalProfiles) {
                setCurrentPage(Math.max(1, Math.ceil(totalProfiles / CONSTANTS.DEFAULT_PAGE_SIZE)));
            }
        };
        setProfiles((prevProfiles) => {
            const filteredProfiles = prevProfiles.filter(profile => shortlistedUsers.includes(profile.userId));
            return filteredProfiles;
        });
        adjustCurrentPage(shortlistedUsers.length);
    }, [currentPage]);

    useEffect(() => {
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
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        window.addEventListener('storage', filterProfiles);
        filterProfiles();
        return () => window.removeEventListener('storage', filterProfiles);
    }, [filterProfiles]);


    if (isLoading) {
        return <Spin size="large" fullscreen />;
    }

    return profiles.length > 0 ? (
        <div className="explore-container">
            <Row gutter={[24, 24]} justify="center">
                {profiles.slice((currentPage - 1) * CONSTANTS.DEFAULT_PAGE_SIZE, currentPage * CONSTANTS.DEFAULT_PAGE_SIZE).map((profile, index) => (
                    <Col key={profile.userId} xs={24} sm={24} lg={12} xl={12}>
                        <ProfileCard profile={profile} handleUpdateShortlist={filterProfiles} />
                    </Col>
                ))}
            </Row>
            {profiles.length > CONSTANTS.DEFAULT_PAGE_SIZE && (
                <Pagination
                    current={currentPage}
                    onChange={setCurrentPage}
                    total={profiles.length}
                    pageSize={CONSTANTS.DEFAULT_PAGE_SIZE}
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