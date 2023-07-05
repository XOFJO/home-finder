import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase.config';
import Spinner from '../components/Spinner';
import shareIcon from '../assets/svg/shareIcon.svg';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Header from '../components/Header';
import Footer from '../components/Footer';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLInkCopied] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, 'listings', params.listingId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    };
    fetchListing();
  }, [navigate, params.listingId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="newPage">
      <div className="is-preload">
        <div id="page-wrapper">
          {/* <!-- Header --> */}
          <Header />

          {/* <!-- Main --> */}
          <section id="main" className="container">
            <header>
              <h2>{listing.name}</h2>
              <p>{listing.location}</p>
            </header>
            <div className="box">
              <span className="image featured">
                <div className="leafletContainer">
                  <MapContainer
                    style={{ height: '100%', width: '100%' }}
                    center={[listing.geolocation.lat, listing.geolocation.lng]}
                    zoom={13}
                    scrollWheelZoom={false}
                  >
                    {' '}
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker
                      position={[
                        listing.geolocation.lat,
                        listing.geolocation.lng,
                      ]}
                    >
                      <Popup>{listing.location}</Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </span>
              <h3>
                <div className="rentSale-tag">
                  For{' '}
                  <strong>{listing.type === 'rent' ? 'Rent' : 'Sale'}</strong> -
                  {'         '}
                  <strong>
                    $
                    {listing.offer
                      ? listing.discountedPrice.toLocaleString()
                      : listing.regularPrice.toLocaleString()}
                  </strong>
                </div>
              </h3>
              <div className="houseInfo">
                {' '}
                <p>
                  {listing.offer && (
                    <p>
                      <strong>
                        ${listing.regularPrice - listing.discountedPrice}
                      </strong>{' '}
                      discount
                    </p>
                  )}
                </p>
                <p>
                  {listing.bedrooms > 1
                    ? `${listing.bedrooms} Bedrooms`
                    : '1 Bedroom'}
                </p>
                <p>
                  {listing.bathrooms > 1
                    ? `${listing.bathrooms} Bathrooms`
                    : '1 Bathroom'}
                </p>
                <p>{listing.parking && 'Parking Spot'}</p>
                <p>{listing.furnished && 'Furnished'}</p>
              </div>
              <Swiper slidesPerView={1} pagination={{ clickable: true }}>
                {listing.imageUrls.map((url, index) => (
                  <SwiperSlide key={index}>
                    <div
                      style={{
                        margin: 'auto',
                        background: `url(${url}) center no-repeat`,
                        backgroundSize: 'cover',
                        height: '60vh',
                        width: '50vw',
                      }}
                      className="swiperSlideDiv"
                    ></div>
                  </SwiperSlide>
                ))}
              </Swiper>
              {auth.currentUser?.uid !== listing.userRef && (
                <Link
                  to={`/contact/${listing.userRef}?listingName=${listing.name}`}
                  className="contact-btn button"
                >
                  Contact landlord
                </Link>
              )}
            </div>
          </section>

          {/* <!-- Footer --> */}
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Listing;
