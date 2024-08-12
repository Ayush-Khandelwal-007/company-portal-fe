import React from 'react';
import { Row, Col } from 'antd';
import ProfileCard from '../Components/ProfileCard';
import SearchFilter from '../Components/SearchFilter';
import '../styles/explore.css'

const Explore = () => {
  const profiles = [
    { name: "A. M.", experience: "4 years", country: "India", expertise: ["Java", "Spring", "GCP", "SQL"], description: "Optimized transportation systems at Walmart Labs." },
    { name: "K. V.", experience: "7 years", country: "India", expertise: ["Python", "AWS", "NoSQL"], description: "Co-founded Metalytics; engineered high-performance columnar DB; SDE at Amazon." },
  ];

  return (
    <div>
      <SearchFilter />
      <Row gutter={[16, 16]}>
        {profiles.map((profile, index) => (
          <Col key={index} xs={24} sm={12} lg={8} xl={6}>
            <ProfileCard profile={profile} />
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default Explore