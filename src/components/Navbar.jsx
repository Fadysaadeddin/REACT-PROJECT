

import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import foodFactoryLogo from "../assets/foodFactory1.webp";
import { FaSearch, FaBars } from "react-icons/fa";
import "../navbar.css";

function Navbar() {
  const { user } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <>
      <nav className="navbar">
        {/* Logo and Welcome Section */}
        <div className="logo-container">
          <Link to="/home">
            <img src={foodFactoryLogo} alt="FoodFactory Logo" className="logo" />
            <h2>FoodFactory</h2>
            {/* <h2>Welcome, {user.name}</h2> */}
          </Link>
        </div>
  
        {/* Search Bar */}
        <div className="search-container">
  <h4 className="search-title">Welcome , {user.name}</h4>
  <form className="search-bar" onSubmit={handleSearchSubmit}>
    <input
      type="text"
      placeholder="Search meals..."
      value={searchQuery}
      onChange={handleSearchChange}
      className="search-input"
    />
    <button type="submit" className="search-button">
      <FaSearch />
    </button>
  </form>
</div>
  
        {/* Hamburger Button */}
        <div className="hamburger-container">
          <div className="hamburger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <FaBars />
          </div>
  
          {/* Menu appears directly below the hamburger icon */}
          {isMobileMenuOpen && (
            <div className="mobile-menu">
              <Link to="/home" className="nav-button">Home</Link>
              <Link to="/favorites" className="nav-button">Favourite Food</Link>
              <Link to="/create-meal" className="nav-button">Create Your Own Meal</Link>
              {user && <Link to="/my-created-meals" className="nav-button">My Created Meals</Link>}
              <Link to="/">logout</Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
  
}

export default Navbar;



