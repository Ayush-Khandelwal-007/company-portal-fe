import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table, Image, Empty, Spin } from 'antd';
import CONSTANTS from '../utils/constants';
import '../styles/compareCandidates.css';
import { fetchComparisonData } from '../utils/functions';
import SkillsDisplay from '../Components/SkillsDisplay';

const CompareCandidates = () => {
    const [comparisonData, setComparisonData] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Add loading state
    const comparedUsers = JSON.parse(localStorage.getItem('comparedUsers')) || [];

    useEffect(() => {
        if(comparedUsers.length < 2){
            return;
        }
        setIsLoading(true); // Set loading to true when starting to fetch
        fetchComparisonData(comparedUsers)
            .then(data => {
                setComparisonData(data.comparison);
                setIsLoading(false); // Set loading to false after fetching
            })
            .catch(error => {
                console.error('Error:', error);
                setIsLoading(false); // Set loading to false on error
            });
    }, []);

    const dataSource = comparisonData ? Object.keys(comparisonData).filter(key => !['fullTimeSalaryCurrency', 'partTimeSalaryCurrency', 'userId', 'profilePic'].includes(key)).map(key => {
        if (key === 'fullTimeSalary') {
            return {
                key: key,
                attribute: 'Full Time Salary',
                user1: `${CONSTANTS.CURRENCY_SYMBOLS[comparisonData.fullTimeSalaryCurrency.user1]} ${comparisonData.fullTimeSalary.user1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} `,
                user2: `${CONSTANTS.CURRENCY_SYMBOLS[comparisonData.fullTimeSalaryCurrency.user2]} ${comparisonData.fullTimeSalary.user2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} `
            };
        } else if (key === 'partTimeSalary') {
            return {
                key: key,
                attribute: 'Part Time Salary',
                user1: `${CONSTANTS.CURRENCY_SYMBOLS[comparisonData.partTimeSalaryCurrency.user1]} ${comparisonData.partTimeSalary.user1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} `,
                user2: `${CONSTANTS.CURRENCY_SYMBOLS[comparisonData.partTimeSalaryCurrency.user2]} ${comparisonData.partTimeSalary.user2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} `
            };
        } else if(key === 'skills') {
            return {
                key: key,

                attribute: 'Skills',
                user1: <SkillsDisplay skills={comparisonData.skills.user1} />,
                user2: <SkillsDisplay skills={comparisonData.skills.user2} />
            };
        } else {
            return {
                key: key,
                attribute: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim(),
                user1: comparisonData[key].user1,
                user2: comparisonData[key].user2
            };
        }
    }) : [];

    const renderProfile = (user, index) => {
        const hashImageIndex = CONSTANTS.getRandomHashIndex(user.userId, CONSTANTS.DEFAULT_IMAGES.length);
        const profilePic = user.profilePic || CONSTANTS.DEFAULT_IMAGES[hashImageIndex];
        const summaryIndex = CONSTANTS.getRandomHashIndex(user.userId, CONSTANTS.RANDOM_SUMMARIES.length);
        const summary = user.summary || CONSTANTS.RANDOM_SUMMARIES[summaryIndex];

        return (
            <Card title={`Candidate ${index}`} className="candidate-profile-card">
                <Image
                    width={200}
                    src={profilePic}
                    className='profile-pic'
                />
                <p className="candidate-name"><strong>Name:</strong> {user.name}</p>
                <p className="candidate-experience"><strong>Experience:</strong> {user.totalExperience} years</p>
                <p className="candidate-skills"><strong>Skills:</strong> <SkillsDisplay skills={user.skills} /></p>
                <p className="candidate-summary"><strong>Summary:</strong> {summary}</p>
            </Card>
        );
    };

    if(comparedUsers.length < 2){
        return (
            <div className='empty-container'>
            <Empty description="You need to select exactly 2 profiles to compare. Click on the 'Compare' button on the shortlisted profiles to compare profiles." />
          </div>)
    }

    if (isLoading) {
        return <Spin size="large" fullscreen/>; 
    }

    return (
        <div className="comparison-container">
            <Row justify="center" className="comparison-row">
                {comparisonData && Object.keys(comparisonData).length > 0 && (
                    <Col span={24} className="comparison-column">
                        <Card title="Profile Comparison" className="profile-comparison-card">
                            { comparisonData?.name?.user1 && renderProfile({
                                userId: comparisonData?.userId?.user1,
                                name: comparisonData?.name?.user1,
                                totalExperience: comparisonData?.totalExperience?.user1,
                                skills: comparisonData?.skills?.user1,
                                location: {
                                    city: comparisonData?.location?.user1.city,
                                    country: comparisonData?.location?.user1.country
                                },
                                profilePic: comparisonData?.profilePic?.user1,
                                summary: comparisonData?.summary?.user1
                            }, 1)}
                            {comparisonData?.name?.user2 && renderProfile({
                                userId: comparisonData?.userId?.user2,
                                name: comparisonData?.name?.user2,
                                totalExperience: comparisonData?.totalExperience?.user2,
                                skills: comparisonData?.skills?.user2,
                                location: {
                                    city: comparisonData?.location?.user2.city,
                                    country: comparisonData?.location?.user2.country
                                },
                                profilePic: comparisonData?.profilePic?.user2,
                                summary: comparisonData?.summary?.user2
                            }, 2)}
                            <Table dataSource={dataSource} columns={CONSTANTS.COMPARE_CANDIDATE_ATTRIBUTES_COLUMNS} pagination={false} className="comparison-table" />
                        </Card>
                    </Col>
                )}
            </Row>
        </div>
    );
};

export default CompareCandidates;