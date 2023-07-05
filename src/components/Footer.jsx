import React from 'react';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();
  return (
    <div className="newPage">
      <div id="page-wrapper">
        <footer id="footer">
          <ul className="icons">
            <li>
              <a
                href="https://github.com/XOFJO/house-market"
                className="icon brands fa-github"
              >
                <span className="label">Github</span>
              </a>
            </li>
            <li>
              <a href="#" className="icon brands fa-linkedin">
                <span className="label">Linkedin</span>
              </a>
            </li>
          </ul>
          <ul className="copyright">
            <li>&copy; Yiheng Ding. All rights reserved.</li>
            <li></li>
          </ul>
        </footer>
      </div>
    </div>
  );
}

export default Footer;
