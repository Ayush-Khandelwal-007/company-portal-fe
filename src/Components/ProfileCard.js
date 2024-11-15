import React, { useState, useEffect } from 'react';
import { Card, Button, Tag, Flex, Badge, message } from 'antd';
import { ArrowRightOutlined, FlagOutlined, FlagFilled, SmileOutlined, SmileFilled } from '@ant-design/icons';
import '../styles/profileCard.css';
import CONSTANTS from '../utils/constants';
import { useNavigate, useLocation } from 'react-router-dom';
import SkillsDisplay from './SkillsDisplay';

const ProfileCard = ({ profile, handleUpdateShortlist = () => { } }) => {
  const { userId, name, totalExperience, location, summary, skills, profilePic, fullTime, partTime, workAvailability, preferredRole } = profile;
  const personalInfoLocation = JSON.parse(location);

  const [isShortlisted, setIsShortlisted] = useState(false);
  const [isCompared, setIsCompared] = useState(false); // New state for compare
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const pageLocation = useLocation();

  const hashImageIndex = CONSTANTS.getRandomHashIndex(userId, CONSTANTS.DEFAULT_IMAGES.length);
  const selectedImage = CONSTANTS.DEFAULT_IMAGES[hashImageIndex]; // Select image based on hash
  const hashSummaryIndex = CONSTANTS.getRandomHashIndex(userId, CONSTANTS.RANDOM_SUMMARIES.length);
  const selectedSummary = summary || CONSTANTS.RANDOM_SUMMARIES[hashSummaryIndex]; // Select summary based on hash


  const compareError = () => {
    messageApi.open({
      type: 'error',
      content: 'You can compare only 2 profiles at a time',
    });
  };

  const toggleShortlist = () => {
    try {
      const shortlistedUsers = JSON.parse(localStorage.getItem('shortlistedUsers')) || [];
      const updatedList = isShortlisted
        ? shortlistedUsers.filter(id => id !== userId)
        : [...shortlistedUsers, userId];

      localStorage.setItem('shortlistedUsers', JSON.stringify(updatedList));
      if(isShortlisted && isCompared)toggleCompare();
      window.dispatchEvent(new Event("storage"));
      setIsShortlisted(!isShortlisted);
      handleUpdateShortlist(updatedList);
    } catch (error) {
      console.error('Failed to update shortlist:', error);
    }
  };

  const toggleCompare = () => {
    const comparedUsers = JSON.parse(localStorage.getItem('comparedUsers')) || [];
    if (comparedUsers.length === 2 && !isCompared) {
      compareError();
      return;
    }

    const updatedList = isCompared
      ? comparedUsers.filter(id => id !== userId)
      : [...comparedUsers, userId];

    localStorage.setItem('comparedUsers', JSON.stringify(updatedList));
    window.dispatchEvent(new Event("storage"));
    setIsCompared(!isCompared);

    if (updatedList.length === 2) {
      navigate('/compare');
    }
  };

  useEffect(() => {
    const shortlistedUsers = JSON.parse(localStorage.getItem('shortlistedUsers')) || [];
    setIsShortlisted(shortlistedUsers.includes(userId));
    const comparedUsers = JSON.parse(localStorage.getItem('comparedUsers')) || []; // Assume localStorage for compared users
    setIsCompared(comparedUsers.includes(userId));
  }, [userId]);

  const card =
  <>
    {contextHolder}
    <Card className="profile-card">
      <div className="profile-card-content">
        <div className="profile-card-header">
          <div className="profile-card-image-container">
            <img src={profilePic || selectedImage} alt={`${name}'s profile`} className='profile-image' />
            <div className="profile-card-title">
              <span>{preferredRole}</span>
              <span className='profile-card-personal-info'>{`${name}  |  Exp: ${totalExperience} years  |  ${personalInfoLocation?.city}, ${personalInfoLocation?.country}`}</span>
            </div>
          </div>
          <div className='profile-card-header-actions'>
            {(pageLocation.pathname === '/shortlisted') ? (
              isCompared ? <SmileFilled onClick={toggleCompare} /> : <SmileOutlined onClick={toggleCompare} />
            ): null
              
            }
            {isShortlisted ?
              <FlagFilled onClick={toggleShortlist} /> :
              <FlagOutlined onClick={toggleShortlist} />}
            <Button type='primary' className='profile-card-view-button' icon={<ArrowRightOutlined />} iconPosition='end' onClick={()=>navigate(`/user/${userId}`)}>
              View Profile
            </Button>
          </div>

        </div>
        <div className="profile-card-summary">
          {selectedSummary}
        </div>
      </div>

      <div className="profile-card-details">
        <div className="profile-card-expertise">
          <span className="profile-card-label">Expert in </span>
          <SkillsDisplay skills={skills} />
        </div>
        <div className="profile-card-commitment">
          <span className="profile-card-label">Commitment </span>
          <Flex className="profile-card-commitment-type">
            {
              fullTime ? <Tag color="#f3f4f6">Full-time</Tag> : null
            }
            {
              partTime ? <Tag color="#f3f4f6">Part-time</Tag> : null
            }
          </Flex>
        </div>
      </div>
    </Card>
  </>

  return workAvailability === "immediately" ? (
    <Badge.Ribbon text={"Immediate Joiner"} placement='start' color='rgb(19 10 10 / 68%)'>
      {card}
    </Badge.Ribbon>
  ) : card;
};

export default ProfileCard;