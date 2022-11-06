import React from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import app from '../firebase/firebaseConfig';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from 'react';


export const AuthProvider = createContext()
const auth = getAuth(app)

const AuthContext = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading ,setLoading] = useState(true)

    const createUser = (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const loginUser = (email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const logOut = () =>{
        setLoading(true)
        return signOut(auth)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser)
            setLoading(false)
            // console.log("Auth state user",currentUser);
        })
        return ()=>{
            unsubscribe()
        }
    },[])


    const userInfo = {
        user,
        createUser,
        loginUser,
        logOut,
        loading
    }
    return (
        <div>
            <AuthProvider.Provider value={userInfo}>
                    {children}
            </AuthProvider.Provider>
        </div>
    );
};

export default AuthContext;