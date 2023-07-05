import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Contact() {
  const [message, setMessage] = useState('');
  const [landlord, setLandlord] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const getLandlord = async () => {
      const docRef = doc(db, 'users', params.landlordId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setLandlord(docSnap.data());
      } else {
        toast.error('Could not get landLord data');
      }
    };

    getLandlord();
  }, [params.landlordId]);
  const onChange = (e) => {
    setMessage(e.target.value);
  };
  return (
    <div className="newPage">
      <div className="is-preload">
        <div id="page-wrapper">
          {/* <!-- Header --> */}
          <Header />

          {/* <!-- Main --> */}
          <section id="main" className="container medium">
            <header>
              <h2>Contact the landlord</h2>
              <p>
                We will help you get in touch with the landlord as soon as
                possible
              </p>
            </header>
            {landlord !== null && (
              <div className="box">
                <form action="">
                  <div className="row gtr-50 gtr-uniform">
                    <div className="col-12">
                      <textarea
                        name="message"
                        id="message"
                        placeholder="Enter your message"
                        rows="6"
                        value={message}
                        onChange={onChange}
                      ></textarea>
                    </div>
                    <div className="col-12">
                      <ul className="actions special">
                        <a
                          href={`mailto:${
                            landlord.email
                          }?Subject=${searchParams.get(
                            'listingName'
                          )}&body=${message}`}
                        >
                          <button type="button" className="button">
                            Send
                          </button>
                        </a>
                      </ul>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </section>

          {/* <!-- Footer --> */}
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Contact;
