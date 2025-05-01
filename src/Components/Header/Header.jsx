import { useState } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = ({ activeNavItem, setActiveNavItem }) => {
  // State for search functionality
  const [searchQuery, setSearchQuery] = useState('');
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  // Handle search submission
  const navigate =useNavigate()
  const handleSearchSubmit = () => {
    // console.log('Search query:', searchQuery);
    // console.log(searchQuery)
    navigate("/search",{state : {searchQuery}})
    // Implement your search logic here
  };
  
  // Handle key press for search
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };


  return (
    <header className="header">
      <div className="header-container">
        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search songs, artists, albums..."
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
          />
        </div>
        
        {/* Premium Button */}
        <button 
          className="premium-button"
          onClick={() => console.log('Premium button clicked')}
        >
          Buy Premium
        </button>
      </div>
    </header>
  );
};

export default Header;