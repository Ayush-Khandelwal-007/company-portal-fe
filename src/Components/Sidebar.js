import React, { useState, useEffect } from 'react';
import { ArrowsAltOutlined, SearchOutlined, FlagOutlined, CalendarOutlined } from '@ant-design/icons';
import logo from '../assets/icon.svg';
import profile from '../assets/profile.png';
import '../styles/sidebar.css';
import { useLocation, Link } from 'react-router-dom';
import { Badge } from 'antd';

export default function Sidebar() {
    const location = useLocation();
    const isActive = (pagePath) => location.pathname === pagePath;
    const [shortlistedUsers, setShortlistedUsers] = useState(() => JSON.parse(localStorage.getItem('shortlistedUsers')) || []);

    useEffect(() => {
        const handleStorageChange = () => {
            setShortlistedUsers(JSON.parse(localStorage.getItem('shortlistedUsers')) || []);
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return (
        <div className="sidebar">
            <div className="sidebar-top">
                <Link className="sidebar-logo" to="/">
                    <img src={logo} alt="logo" />
                </Link>
                <ul>
                    <Link to="/">
                        <SearchOutlined className={isActive('/') ? 'active' : ''} />
                        <span>Search</span>
                    </Link>
                    <Badge count={shortlistedUsers.length}>
                        <Link to="/shortlisted">
                            <FlagOutlined className={isActive('/shortlisted') ? 'active' : ''} />
                            <span>Shortlisted</span>
                        </Link>
                    </Badge>
                    <Link to="/compare">
                        <ArrowsAltOutlined className={isActive('/compare') ? 'active' : ''} style={{ transform: 'rotate(45deg)' }} />
                        <span>Compare</span>
                    </Link>
                </ul>
            </div>
            <ul className="sidebar-bottom">
                <a>
                    <CalendarOutlined />
                </a>
                <div className="sidebar-profile" to="/">
                    <img src={profile} alt="profile" />
                </div>
            </ul>
        </div>
    );
}