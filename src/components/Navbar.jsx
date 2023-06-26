import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as OfferIcon } from "../assets/svg/localOfferIcon.svg";
import { ReactComponent as ExploreIcon } from "../assets/svg/exploreIcon.svg";
import { ReactComponent as PersonOutline } from "../assets/svg/personOutlineIcon.svg";

function Navbar() {
  const Navigate = useNavigate();
  const location = useLocation();
  const pathRouteMatch = (route) => {
    if (route === location.pathname) {
      return true;
    }
    return false;
  };
  return (
    <footer className="navbar">
      <nav className="navbarNav">
        <ul className="navbarListItems">
          <li
            className="navbarListItem"
            onClick={() => {
              Navigate("/");
            }}
          >
            <ExploreIcon
              fill={pathRouteMatch("/") ? "#2c2c2c" : "#8f8f8f"}
              width="36px"
              height="36px"
            />
            <p
              className={
                pathRouteMatch("/")
                  ? "navbarListItemNameActive"
                  : "navbarListItemName"
              }
            >
              Explore
            </p>
          </li>
          <li
            className="navbarListItem"
            onClick={() => {
              Navigate("/Offer");
            }}
          >
            <OfferIcon
              fill={pathRouteMatch("/Offer") ? "#2c2c2c" : "#8f8f8f"}
              width="36px"
              height="36px"
            />
            <p
              className={
                pathRouteMatch("/Offer")
                  ? "navbarListItemNameActive"
                  : "navbarListItemName"
              }
            >
              Offers
            </p>
          </li>
          <li
            className="navbarListItem"
            onClick={() => {
              Navigate("/Profile");
            }}
          >
            <PersonOutline
              fill={pathRouteMatch("/Profile") ? "#2c2c2c" : "#8f8f8f"}
              width="36px"
              height="36px"
            />
            <p
              className={
                pathRouteMatch("/Profile")
                  ? "navbarListItemNameActive"
                  : "navbarListItemName"
              }
            >
              Profile
            </p>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Navbar;
