import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaTachometerAlt, FaUsers, FaPlusSquare, FaChartBar, FaSignOutAlt, FaHome, FaUtensils, FaCaretDown, FaCaretUp } from 'react-icons/fa';
import logo from '../Images/candy.png'; 

const SidebarContainer = styled.div`
  position: relative; /* Position relative for the pseudo-element */
  width: 220px;
  height: 200vh;
  background-image: url('https://www.sweets4me.co.uk/cdn/shop/collections/traditionalloose_0203cf46-429a-4e70-81ef-f2aa5bd6ec8a.jpg?v=1634897951&width=1080');
  background-size: cover; /* Ensures the image covers the entire background */
  background-position: center; /* Centers the background image */
  padding: 20px;
  flex-direction: column;
  color: #ecf0f1; /* Light text color */
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); /* Add shadow for depth */

  /* Overlay */
  &::before {
    content: '';
    position: absolute; /* Position absolute to cover the whole container */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8); /* Black with 50% opacity */
    z-index: 1; /* Ensure the overlay is on top */
  }

  /* Ensure the text appears above the overlay */
  > * {
    position: relative; /* Position elements relative to the sidebar */
    z-index: 2; /* Ensure text is above the overlay */
  }
`;


const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 180px; 
  height: auto;
  margin-bottom: 10px;
`;

const Menu = styled.div`
  flex-grow: 1;
`;

const MenuSectionTitle = styled.h4`
  margin: 20px 0 0 0; /* Top margin only */
  color: #fff;
  cursor: pointer;
    font-size: 18px;
    margin-bottom: 20px;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: 18px;
  cursor: pointer;
  padding: 10px;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #34495e; /* Darker background on hover */
    color: #fff;
  }
`;

const Icon = styled.div`
  margin-right: 15px;
  font-size: 20px;
`;

const ExpandableMenu = styled.div`
  padding-left: 20px; 
  margin-bottom: 40px;
`;

const Sidebar = () => {
  const [isStaffMenuOpen, setStaffMenuOpen] = useState(true);
  const [isMenuManagementOpen, setMenuManagementOpen] = useState(true);

  return (
    <SidebarContainer>
      <LogoContainer>
        <LogoImage src={logo} alt="Hotel Logo" />
      </LogoContainer>

      {/* Staff Management Section */}
      <Menu>
        <MenuSectionTitle onClick={() => setStaffMenuOpen(!isStaffMenuOpen)}>
          Staff Management {isStaffMenuOpen ? <FaCaretUp /> : <FaCaretDown />}
        </MenuSectionTitle>
        {isStaffMenuOpen && (
          <ExpandableMenu>
            <Link to="/view-employee" style={{ textDecoration: 'none', color: 'inherit' }}>
              <MenuItem>
                <Icon><FaUsers /></Icon>
                View Staff
              </MenuItem>
            </Link>
            <Link to="/all-attendance" style={{ textDecoration: 'none', color: 'inherit' }}>
              <MenuItem>
                <Icon><FaChartBar /></Icon>
                View Attendances
              </MenuItem>
            </Link>
            <Link to="/view-leaves" style={{ textDecoration: 'none', color: 'inherit' }}>
              <MenuItem>
                <Icon><FaChartBar /></Icon>
                View Leaves
              </MenuItem>
            </Link>
            <Link to="/employee-report" style={{ textDecoration: 'none', color: 'inherit' }}>
              <MenuItem>
                <Icon><FaChartBar /></Icon>
                Staff Report
              </MenuItem>
            </Link>
          </ExpandableMenu>
        )}
      </Menu>


      {/* Home and Sign Out */}
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <MenuItem>
          <Icon><FaHome /></Icon>
          Home
        </MenuItem>
      </Link>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <MenuItem>
          <Icon><FaSignOutAlt /></Icon>
          Sign Out
        </MenuItem>
      </Link>
    </SidebarContainer>
  );
};

export default Sidebar;
