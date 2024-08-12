import React from 'react';
import { Card } from 'antd';

const ProfileCard = ({ profile }) => {
  return (
    <Card className="profile-card">
      <div className="card-title">{`${profile.name} | Exp: ${profile.experience} | ${profile.country}`}</div>
      <div className="card-content">{profile.description}</div>
      <div className="expertise-list">Expert in: {profile.expertise.join(', ')}</div>
    </Card>
  );
};

export default ProfileCard;