import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import auth from "../Firebase/firebase.config";
import axios from "axios";

const googleProvider = new GoogleAuthProvider;

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const UserRegitration = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const UserLogIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const UserLogOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const UserGoogleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }


    // Observe the auth state changes in this Section
    useEffect(() => {
        const unSubScribe = onAuthStateChanged(auth, async (currentUser) => {
            console.log('Current user: ', currentUser)
            setUser(currentUser);
            if (currentUser) {
                const userinfo = { email: currentUser?.email }
                axios.post('http://localhost:5000/jwt', userinfo)
                    .then(res => {
                        const token = res?.data?.token;
                        localStorage.setItem("access_token", token);
                        setLoading(false);
                    })
            }
            else {
                localStorage.removeItem("access_token");
                setLoading(false);
            }
        })
        return () => {
            unSubScribe();
        }
    }, [])

    const authInfo = { user, UserRegitration, UserLogIn, loading, UserLogOut, UserGoogleLogin }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.node
}