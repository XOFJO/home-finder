import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export function useAuthStatus() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [userName, setUserName] = useState('');
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        setUserName(auth.currentUser.displayName);
      }
      setCheckingStatus(false);
    });
  }, []);
  return { loggedIn, checkingStatus, userName };
}
