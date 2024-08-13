import React from 'react';
import { Card, Button } from 'antd';
import profile1 from '../assets/profiles/1.jpg';
import profile2 from '../assets/profiles/2.jpg';
import profile3 from '../assets/profiles/3.jpg';
import profile4 from '../assets/profiles/4.jpg';
import profile5 from '../assets/profiles/5.jpg';
import profile6 from '../assets/profiles/6.jpg';
import profile7 from '../assets/profiles/7.jpg';
import profile8 from '../assets/profiles/8.jpg';
import profile9 from '../assets/profiles/9.jpg';
import { ArrowRightOutlined } from '@ant-design/icons';
import '../styles/profileCard.css';

const defaultImages = [profile1, profile2, profile3, profile4, profile5, profile6, profile7, profile8, profile9];


// Simple hash function to determine image index
const getImageIndex = (userId) => {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = (hash + userId.charCodeAt(i)) % defaultImages.length;
  }
  return hash;
};

const ProfileCard = ({ profile }) => {
  const { userId, name, totalExperience, location, summary, skills, profilePic, commitment } = profile;
  const imageIndex = getImageIndex(userId | "hqudhu");
  const selectedImage = defaultImages[imageIndex]; // Select image based on hash

  console.log( { userId, name, totalExperience, location, summary, skills, profilePic, commitment })
  return (
    <Card className="profile-card">
      <div>
        <div>
          <div>
            <img src={profilePic || selectedImage} alt={`${name}'s profile`} className='profile-image'/>
            <div className="card-title">{`${name} | Exp: ${totalExperience} | ${location}`}</div>
          </div>
          <Button type='primary' className='follow-button' icon={<ArrowRightOutlined />} iconPosition='end'>
            View Profile
          </Button>
        </div>
        <div>
          {summary}
        </div>
      </div>

      <div>
        <div className="expertise-list">
            <span>Expertise in: </span>
            <span>{skills}</span>
        </div>
        <div className="expertise-list">
          <span>Commitment: </span>
          <span>{commitment}</span>
        </div>
      </div>
      
      
    </Card>
  );
};

export default ProfileCard;