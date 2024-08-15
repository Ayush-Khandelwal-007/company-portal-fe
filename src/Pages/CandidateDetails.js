import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Image, Button, Row, Col, Spin } from 'antd';
import { 
  ShareAltOutlined, ArrowRightOutlined, FlagOutlined, FlagFilled, 
  MailOutlined, VideoCameraOutlined, SolutionOutlined, BookOutlined, 
  CheckCircleOutlined 
} from '@ant-design/icons';
import '../styles/candidateDetails.css';
import CONSTANTS from '../utils/constants';
import OrgImage from '../assets/org.png';
import SchoolImage from '../assets/school.png';
import ResumeSection from '../Components/ResumeSection';
import SkillsDisplay from '../Components/SkillsDisplay';
import { fetchCandidateDetails } from '../utils/functions';

const CandidateDetails = () => {
    const { id } = useParams();
    const [candidate, setCandidate] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isShortlisted, setIsShortlisted] = useState(false);
    
    const personalInfoLocation = candidate?.personalInfoLocation;
    const selectedImage = CONSTANTS.DEFAULT_IMAGES[CONSTANTS.getRandomHashIndex(id, CONSTANTS.DEFAULT_IMAGES.length)];
    const selectedSummary = candidate?.summary || CONSTANTS.RANDOM_SUMMARIES[CONSTANTS.getRandomHashIndex(id, CONSTANTS.RANDOM_SUMMARIES.length)];

    const toggleShortlist = () => {
        const shortlistedUsers = JSON.parse(localStorage.getItem('shortlistedUsers')) || [];
        const updatedList = isShortlisted ? shortlistedUsers.filter(uid => uid !== id) : [...shortlistedUsers, id];
        setIsShortlisted(!isShortlisted);
        localStorage.setItem('shortlistedUsers', JSON.stringify(updatedList));
        window.dispatchEvent(new Event("storage"));
    };

    useEffect(() => {
        const shortlistedUsers = JSON.parse(localStorage.getItem('shortlistedUsers')) || [];
        setIsShortlisted(shortlistedUsers.includes(id));

        const loadCandidateDetails = async () => {
            setIsLoading(true);
            try {
                const data = await fetchCandidateDetails(id);
                setCandidate(data);
            } catch (error) {
                console.error('Failed to fetch candidate details:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadCandidateDetails();
    }, [id]);

    if (isLoading) {
        return <Spin size="large" fullscreen/>;  
    }

    if (!candidate) {
        return <div>No candidate data available.</div>;
    }

    return (
        <div className="candidate-details-container">
            <Card className="candidate-card">
                <div className="candidate-header">
                    <Image className="candidate-image" src={candidate.profilePic || selectedImage} />
                    <div className="candidate-card-title">
                        <span className="candidate-role">{candidate.preferredRole}</span>
                        <span className='candidate-personal-info'>{`${candidate.name}  |  Exp: ${candidate.totalExperience} years  |  ${personalInfoLocation?.city}, ${personalInfoLocation?.country}`}</span>
                    </div>
                </div>
                <div className="candidate-actions-container">
                    <div className="candidate-buttons">
                        <Button icon={<MailOutlined />} className="request-intro-button">Request Intro</Button>
                        <Button icon={isShortlisted ?<FlagFilled/> :<FlagOutlined/>} onClick={toggleShortlist} className="shortlist-button">Shortlist</Button>
                        <Button className="share-button" icon={<ShareAltOutlined />} />
                    </div>
                    <div className="candidate-summary">
                        {selectedSummary}
                    </div>
                    <div className="candidate-expertise-container">
                        <div className="candidate-expertise-header">
                            <span className="profile-card-label">Expert in </span>
                            <SkillsDisplay skills={candidate.skills} />
                        </div>
                        <Button className="hire-button" icon={<ArrowRightOutlined />} iconPosition='end'>Hire Instantly</Button>
                    </div>
                </div>
                <div className="candidate-quick-links">
                    <Button icon={<VideoCameraOutlined />} className="quick-link-button" onClick={() => console.log(`/interview/${candidate.userId}`)}>Interview</Button>
                    <Button icon={<SolutionOutlined />} className="quick-link-button" onClick={() => console.log(`/experience/${candidate.userId}`)}>Experience</Button>
                    <Button icon={<BookOutlined />} className="quick-link-button" onClick={() => console.log(`/education/${candidate.userId}`)}>Education</Button>
                </div>
                <Row className="availability-row" gutter={[16, 16]}>
                    {candidate.fullTime ? <Col span={12} className="full-time-col">
                        <Card className="availability-card">
                            <CheckCircleOutlined className='availability-check'/>
                            <Card.Meta className="availability-meta" title="Full Time" description="Can start 40+ hours / week immediately" />
                            <span>{`${CONSTANTS.CURRENCY_SYMBOLS[candidate.fullTimeSalaryCurrency]} ${candidate.fullTimeSalary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} / month`}</span>
                            </Card>
                    </Col> : null}
                    {candidate.partTime ? <Col span={12} className="part-time-col">
                        <Card className="availability-card">
                            <CheckCircleOutlined className='availability-check'/>
                            <Card.Meta className="availability-meta" title="Part Time" description="Can start 20+ hours / week immediately" />
                            <span>{`${CONSTANTS.CURRENCY_SYMBOLS[candidate.partTimeSalaryCurrency]} ${candidate.partTimeSalary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} / month`}</span>
                        </Card>
                    </Col> : null}
                </Row>
                <ResumeSection heading="Work Experience" subsections={candidate.workExperiences.map(workExperience => ({
                    title: workExperience.role,
                    subtitle: `${workExperience.company || ""} | ${workExperience.locationCity}, ${workExperience.locationCountry}`,
                    description: workExperience.description,
                    duration: `${workExperience.startDate} - ${workExperience.endDate}`
                }))} subsectionImage={OrgImage}/>
                <ResumeSection heading="Education" subsections={candidate.educationDetails.split("=").map(education => {
                    const [school, duration, degree] = education.split(":");
                    return ({
                    title: degree,
                    subtitle: `${school}`,
                    description: null,
                    duration: duration
                })})} subsectionImage={SchoolImage}/>
            </Card>
        </div>
    );
};

export default CandidateDetails;