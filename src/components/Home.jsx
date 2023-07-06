import React from 'react';
import Slider from '../components/Slider';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';
import Header from './Header';
import Footer from './Footer';

function Home() {
  const navigate = useNavigate();
  const { loggedIn, checkingStatus, userName } = useAuthStatus();
  if (checkingStatus) {
    return <Spinner />;
  }
  return (
    <div className="newPage">
      <div id="homeBody" className="landing is-preload">
        <div id="page-wrapper">
          {/* <!-- Header --> */}
          <header id="header" className="alt">
            <h1>
              <a href="#">Home Finder</a>
            </h1>
            <nav id="nav">
              {loggedIn ? (
                <ul>
                  <li>
                    <a href="#">Home</a>
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
                      className="button"
                      onClick={() => {
                        navigate('/profile');
                      }}
                    >
                      Profile
                    </a>
                  </li>
                </ul>
              ) : (
                <ul>
                  <li>
                    <a href="#">Home</a>
                  </li>
                  <li>
                    <a
                      className="button"
                      onClick={() => {
                        navigate('/Offer');
                      }}
                    >
                      Offer
                    </a>
                    <a
                      className="button"
                      onClick={() => {
                        navigate('/signUp');
                      }}
                    >
                      Sign Up
                    </a>
                    <a
                      className="button"
                      onClick={() => {
                        navigate('/signIn');
                      }}
                    >
                      Sign In
                    </a>
                  </li>
                </ul>
              )}
            </nav>
          </header>

          {/* <!-- Banner --> */}
          <section id="banner">
            {loggedIn ? (
              <>
                <h2>Welcome back, {userName}!</h2>
                <ul className="actions special">
                  <li>
                    <a
                      className="button primary"
                      onClick={() => {
                        navigate('/profile');
                      }}
                    >
                      View your profile
                    </a>
                  </li>
                </ul>
                <p>
                  Are you ready to embark on the journey of finding a new home?
                </p>
              </>
            ) : (
              <>
                <h2>Home Finder</h2>
                <p>
                  Are you looking to find a home or offer a place for others?
                  You've come to the right place.
                </p>
                <ul className="actions special">
                  <li>
                    <a
                      className="button primary"
                      onClick={() => {
                        navigate('/signUp');
                      }}
                    >
                      Sign Up
                    </a>
                  </li>
                  <li>
                    <a
                      className="button"
                      onClick={() => {
                        navigate('/signIn');
                      }}
                    >
                      Sign In
                    </a>
                  </li>
                </ul>
              </>
            )}
          </section>

          {/* <!-- Main --> */}
          <section id="main" className="container">
            <section className="box special">
              <header className="major">
                <h2>Find your new home</h2>
                <p>
                  We warmly welcome you to our exclusive online hub for buying,
                  selling, and renting houses. Here, you'll explore a diverse
                  range of properties meticulously tailored to accommodate every
                  unique lifestyle and preference.
                </p>
              </header>
              <span className="image featured">
                <div>
                  <Slider />
                </div>
              </span>
            </section>

            <section className="box special features">
              <div className="features-row">
                <section>
                  <span
                    className="icon solid major fa-building-user accent2 cursor"
                    onClick={() => {
                      navigate('/category/rent');
                    }}
                  ></span>
                  <h3>
                    <strong>Rent</strong>
                  </h3>
                  <p>
                    Explore our extensive rental listings and find the perfect
                    home for your needs, whether you're looking for a short-term
                    lease or a long-term rental agreement.
                  </p>
                </section>
                <section>
                  <span
                    className="icon solid major fa-house-lock accent3 cursor"
                    onClick={() => {
                      navigate('/category/sale');
                    }}
                  ></span>
                  <h3>
                    <strong>Sale</strong>
                  </h3>
                  <p>
                    Browse through our impressive collection of homes for sale
                    and unlock the door to your dream property. From cozy
                    starter homes to luxurious estates, we have a wide range of
                    options to cater to every buyer's taste and budget.
                  </p>
                </section>
              </div>
            </section>
          </section>

          {/* <!-- Footer --> */}
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Home;
