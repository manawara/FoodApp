import { createContext, useEffect, useState, useContext, useMemo } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  signInWithPopup,
  getAuth,
  updateEmail,
} from "firebase/auth";
import { updateDoc, doc, getDoc, setDoc } from "firebase/firestore";

import { auth, db, provider } from "../config/firebase";
import {
  getFormattedDate,
  calculatePurpose,
  calculateBMR,
  calculatePAL,
  calculateDeficiency,
  calculateCaloric,
  calculateNutritionalValues,
} from "../helpers/helpers";

export const UserContext = createContext({
  createUser: () => {},
  signIn: () => {},
  logout: () => {},
  user: "",
  userDetail: "",
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userDetail, setUserDetail] = useState({});

  const [activate, setActivate] = useState(false);
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user !== null) {
        getUser(user);
        getActivate(user.uid);
        getUserDetails(user.uid);
      }
    });
  }, []);

  const getUserDetails = async (userID) => {
    const docRef = doc(db, "users", userID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUserDetail(docSnap.data());
    }
  };

  const getUser = async (user) => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return addUserDetail(user.email, user.uid);
    }
  };

  const getActivate = async (userID) => {
    const docRef = doc(db, "users", userID);
    const docSnap = (await getDoc(docRef)).data();

    if (docSnap.activate == false || docSnap.activate == "undefined") {
      setActivate(false);
    } else {
      setActivate(true);
    }
  };
  const createUser = async (name = "", email, password) => {
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("provider", email);
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (userID, data) => {
    const update = doc(db, "users", userID);
    updateDoc(update, {
      name: localStorage.getItem("name"),
      activate: true,
      currentWeight: data.currentWeight,
      targetWeight: data.targetWeight,
      trainingActivity: data.trainingActivity,
      changeWeight: data.changeWeight,
      activityDay: data.activityDay,
    });
    setActivate(true);
    getUserDetails(user.uid);
  };

  const updateUserDetail = async (userID, name, email, password) => {
    const auth = getAuth();
    const update = doc(db, "users", userID);
    await updateDoc(update, { name: name, email: email });
    await updateProfile(auth.currentUser, {
      displayName: name,
    });
    // await updateEmail(auth.currentUser, {email: 'test99@test.pl'})
    //     await getUserDetails(userID)
  };
  const addUserDetail = async (email, userID) => {
    const users = doc(db, "users", userID);
    await setDoc(users, {
      name: "",
      email: email,
      activate: false,
      createdAt: getFormattedDate(new Date()),
    });
  };

  const signIn = (email, password) => {
    localStorage.setItem("provider", "no");
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const name = result.user.displayName;
        const email = result.user.email;

        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("provider", "yes");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logout = () => {
    return signOut(auth);
  };

  return (
    <UserContext.Provider
      value={{
        createUser,
        user,
        userDetail,
        signIn,
        logout,
        addUserDetail,
        getUser,
        updateUser,
        activate,
        updateUserDetail,
        signInWithGoogle,

        getUserDetails,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const UserAuth = () => {
  return useContext(UserContext);
};
