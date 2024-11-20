import React from 'react';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/create');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user');
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };

  return (
    <div className="header-container" >
      <div className="header-content">
        <div className="header-logo"onClick={()=>navigate('/')}>
          <OlxLogo />
        </div>

        <div className="search-box">
          <Search />
          <input type="text" placeholder="Search for products, services..." />
          <Arrow />
        </div>

        <div className="actions">
          <span onClick={handleLogout} className="logout-btn">Logout</span>
          <div className="sell-btn" onClick={handleClick}>
            <div className="sell-btn-content">
              <SellButtonPlus />
              <span>SELL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
