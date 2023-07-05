import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  return (
    <div className="newPage">
      <div id="page-wrapper">
        <header id="header">
          <h1>
            <a
              onClick={() => {
                navigate('/');
              }}
              style={{ cursor: 'pointer' }}
            >
              Home Finder
            </a>
          </h1>
          <nav id="nav">
            <ul>
              <li>
                <a
                  onClick={() => {
                    navigate('/');
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  className="button"
                  onClick={() => {
                    navigate('/offer');
                  }}
                >
                  Offers
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    navigate('/profile');
                  }}
                  className="button"
                >
                  Profile
                </a>
              </li>
            </ul>
          </nav>
        </header>
      </div>
    </div>
  );
}

export default Header;
