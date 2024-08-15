import React from 'react';
import { Flex, Tag } from 'antd';
import CONSTANTS from '../utils/constants';

const SkillsDisplay = ({ skills }) => {
    return (
        <Flex className="profile-card-expertise-list">
            {[...new Set(skills.split(','))].map((skill) => (
                <span key={skill}>
                    <Tag color={CONSTANTS.TAG_COLORS[CONSTANTS.getRandomHashIndex(skill, CONSTANTS.TAG_COLORS.length)]}>
                        {skill}
                    </Tag>
                </span>
            ))}
        </Flex>
    );
};

export default SkillsDisplay;