import React from 'react';
import { ArrowsAltOutlined, SearchOutlined, FlagOutlined, CalendarOutlined } from '@ant-design/icons';
import logo from '../assets/icon.svg'
import profile from '../assets/profile.png'
import '../styles/sidebar.css'


export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar-top">
                <a className="sidebar-logo" href="/">
                    <img src={logo} alt="logo" />
                </a>
                <ul>
                    <li>
                        <SearchOutlined />
                        <span>Search</span>
                    </li>    
                    <li>
                        <FlagOutlined />
                        <span>Shortlisted</span>
                    </li>
                    <li>
                        <ArrowsAltOutlined style={{ transform: 'rotate(45deg)' }}/>
                        <span>Compare</span>
                    </li>
                </ul>
            </div>
            <ul className="sidebar-bottom">
                <li>
                    <CalendarOutlined />
                </li>
                <a className="sidebar-profile" href="/">
                    <img src={profile} alt="profile" />
                </a>
            </ul>
        </div>
      );
}
