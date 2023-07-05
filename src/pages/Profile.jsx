import React from 'react';
import { useEffect, useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {
  updateDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg';
import homeIcon from '../assets/svg/homeIcon.svg';
import ListingItem from '../components/ListingItem';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);
  const [changeDetails, setChangeDetails] = useState();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { email, name } = formData;

  useEffect(() => {
    const fetchUserListing = async () => {
      const listingRef = collection(db, 'listings');
      const q = query(
        listingRef,
        where('userRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      );
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        listings.push({ id: doc.id, data: doc.data() });
      });
      setListings(listings);
      setLoading(false);
    };
    fetchUserListing();
  }, [auth.currentUser.uid]);

  function onLogOut() {
    auth.signOut();
    navigate('/signIn');
  }

  async function onSubmit() {
    try {
      if (name !== auth.currentUser.displayName) {
        await updateProfile(auth.currentUser, { displayName: name });

        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, { name });
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  }

  function onChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  }

  async function onDelete(listingId) {
    if (window.confirm('Are you sure you want to delete?')) {
      await deleteDoc(doc(db, 'listings', listingId));
      const updatedListings = listings.filter((listing) => {
        return listing.id !== listingId;
      });
      setListings(updatedListings);
      toast.success('Successfully delete the listing!');
    }
  }

  const onEdit = (listingId) => {
    navigate(`/editListing/${listingId}`);
  };

  return (
    <>
      <Header />
      <div className="profile">
        <header className="profileHeader">
          <p className="pageHeader">My profile</p>
          <div className="newPage">
            <button type="button" className="button" onClick={onLogOut}>
              Log Out
            </button>
          </div>
        </header>
        <main>
          <div className="profileDetailsHeader">
            <p className="profileDetailsText">Personal Details</p>
            <p
              className="changePersonalDetails"
              onClick={() => {
                changeDetails && onSubmit();
                setChangeDetails((prev) => !prev);
              }}
            >
              {changeDetails ? 'done' : 'change'}
            </p>
          </div>
          <div className="profileCard">
            <form>
              <input
                type="text"
                className={changeDetails ? 'profileNameActive' : 'profileName'}
                disabled={changeDetails ? false : true}
                value={name}
                id="name"
                onChange={onChange}
              />
              <input
                type="text"
                className={'profileEmail'}
                disabled={true}
                value={email}
                id="email"
              />
            </form>
          </div>
          <Link to="/createListing" className="createListing">
            <img src={homeIcon} alt="home" />
            <p>sell or rent your home</p>
            <img src={arrowRight} alt="arrow Right" />
          </Link>
          {!loading && listings?.length > 0 && (
            <>
              <p className="listingText"> Your Listing</p>
              <ul className="listingList">
                {listings.map((listing) => {
                  return (
                    <ListingItem
                      key={listing.id}
                      listing={listing.data}
                      id={listing.id}
                      onDelete={() => {
                        onDelete(listing.id);
                      }}
                      onEdit={() => {
                        onEdit(listing.id);
                      }}
                    />
                  );
                })}
              </ul>
            </>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
