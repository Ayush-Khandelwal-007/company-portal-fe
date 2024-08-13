import React from 'react';
import { ArrowsAltOutlined, SearchOutlined, FlagOutlined, CalendarOutlined } from '@ant-design/icons';
import logo from '../assets/icon.svg'
import profile from '../assets/profile.png'
import '../styles/sidebar.css'
import {Link} from 'react-router-dom'


export default function Sidebar({ path }) {
    const isActive = (iconPath) => path === iconPath;

    return (
        <div className="sidebar">
            <div className="sidebar-top">
                <Link className="sidebar-logo" to="/">
                    <img src={logo} alt="logo" />
                </Link>
                <ul>
                    <Link to="/">
                        <SearchOutlined className={isActive('/') || isActive('/user') ? 'active' : ''} />
                        <span>Search</span>
                    </Link>
                    <Link to="/shortlisted">
                        <FlagOutlined className={isActive('/shortlisted') ? 'active' : ''} />
                        <span>Shortlisted</span>
                    </Link>
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