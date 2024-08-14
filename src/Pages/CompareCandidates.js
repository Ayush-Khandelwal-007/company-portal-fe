import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table, Image, Empty } from 'antd';
import constants from '../utils/constants';
import '../styles/compareCandidates.css';
import { fetchComparisonData } from '../utils/api';

const CompareCandidates = () => {
    const [comparisonData, setComparisonData] = useState(null);
    const comparedUsers = JSON.parse(localStorage.getItem('comparedUsers')) || [];

    useEffect(() => {
        if(comparedUsers.length < 2){
            return;
        }
        fetchComparisonData(comparedUsers)
            .then(data => {
                setComparisonData(data.comparison);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    const columns = [
        {
            title: 'Attribute',
            dataIndex: 'attribute',
            key: 'attribute'
        },
        {
            title: 'User 1',
            dataIndex: 'user1',
            key: 'user1'
        },
        {
            title: 'User 2',
            dataIndex: 'user2',
            key: 'user2'
        }
    ];

    const dataSource = comparisonData ? Object.keys(comparisonData).filter(key => !['fullTimeSalaryCurrency', 'partTimeSalaryCurrency', 'userId', 'profilePic'].includes(key)).map(key => {
        if (key === 'fullTimeSalary') {
            return {
                key: key,
                attribute: 'Full Time Salary',
                user1: `${constants.currency_symbols[comparisonData.fullTimeSalaryCurrency.user1]} ${comparisonData.fullTimeSalary.user1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} `,
                user2: `${constants.currency_symbols[comparisonData.fullTimeSalaryCurrency.user2]} ${comparisonData.fullTimeSalary.user2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} `
            };
        } else if (key === 'partTimeSalary') {
            return {
                key: key,
                attribute: 'Part Time Salary',
                user1: `${constants.currency_symbols[comparisonData.partTimeSalaryCurrency.user1]} ${comparisonData.partTimeSalary.user1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} `,
                user2: `${constants.currency_symbols[comparisonData.partTimeSalaryCurrency.user2]} ${comparisonData.partTimeSalary.user2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} `
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
        const hashImageIndex = constants.getRandomHashIndex(user.userId, constants.defaultImages.length);
        const profilePic = user.profilePic || constants.defaultImages[hashImageIndex];
        const summaryIndex = constants.getRandomHashIndex(user.userId, constants.randomSummaries.length);
        const summary = user.summary || constants.randomSummaries[summaryIndex];

        return (
            <Card title={`Candidate ${index}`} style={{ margin: '10px' }} className="candidate-profile-card">
                <Image
                    width={200}
                    src={profilePic}
                    className='profile-pic'
                />
                <p className="candidate-name"><strong>Name:</strong> {user.name}</p>
                <p className="candidate-experience"><strong>Experience:</strong> {user.totalExperience} years</p>
                <p className="candidate-skills"><strong>Skills:</strong> {user.skills}</p>
                <p className="candidate-summary"><strong>Summary:</strong> {summary}</p>
            </Card>
        );
    };

    if(comparedUsers.length < 2){
        return (
            <div className='empty-container'>
            <Empty description="You need to select at least 2 profiles to compare. Click on the 'Compare' button on the shortlisted profiles to compare profiles." />
          </div>)
    }
    return (
        <div style={{ padding: '20px' }} className="comparison-container">
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
                            <Table dataSource={dataSource} columns={columns} pagination={false} className="comparison-table" />
                        </Card>
                    </Col>
                )}
            </Row>
        </div>
    );
};

export default CompareCandidates;