import { useState } from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [activeItem, setActiveItem] = useState('browse');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate=useNavigate()
  const handleItemClick = (item) => {
    if(item=='myplaylist'){
        navigate("/myplaylist")
    }else if(item=='create'){
            navigate("/createplaylist")
    }else if(item=='favorite'){
        navigate("/favorite")
    }else if(item=='mood'){
        navigate("/mood")
    }else if(item=='home'){
        navigate("/home")
    }
    setActiveItem(item);
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-mobile-toggle" onClick={toggleMobileMenu}>
          <span className="menu-icon"></span>
          <span className="menu-icon"></span>
          <span className="menu-icon"></span>
        </div>
        
        <div className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <div 
            className={`navbar-item ${activeItem === 'home' ? 'active' : ''}`}
            onClick={() => handleItemClick('home')}
          >
            <span className="navbar-icon">🏠♪</span>
            <span className="navbar-text">Home</span>
          </div>
          <div 
            className={`navbar-item ${activeItem === 'myplaylist' ? 'active' : ''}`}
            onClick={() => handleItemClick('myplaylist')}
          >
            <span className="navbar-icon">🎵</span>
            <span className="navbar-text">My Playlist</span>
          </div>
          
          <div 
            className={`navbar-item ${activeItem === 'DetectMood' ? 'active' : ''}`}
            onClick={() => handleItemClick('mood')}
          >
            <span className="navbar-icon">📸</span>
            <span className="navbar-text">Detect Mood</span>
          </div>
          
          <div 
            className={`navbar-item ${activeItem === 'favorite' ? 'active' : ''}`}
            onClick={() => handleItemClick('favorite')}
          >
            <span className="navbar-icon">❤️</span>
            <span className="navbar-text">Favorite Songs</span>
          </div>
          
          <div 
            className={`navbar-item ${activeItem === 'create' ? 'active' : ''}`}
            onClick={() => handleItemClick('create')}
          >
            <span className="navbar-icon">📜</span>
            <span className="navbar-text">History</span>
          </div>
          
          {/* <div 
            className={`navbar-item ${activeItem === 'browse' ? 'active' : ''}`}
            onClick={() => handleItemClick('browse')}
          >
            <span className="navbar-icon">🔍</span>
            <span className="navbar-text">Browse Songs</span>
          </div> */}
        </div>
      </div>
    </nav>
  );
}