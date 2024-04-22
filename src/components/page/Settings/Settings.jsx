import userIcon from "/src/assets/user.png";
import Input from "../../UI/Input.jsx";
import { ButtonFill } from "../../UI/Button.jsx";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../../../context/AuthContext.jsx";
import {
  getAuth,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { CgCheckO } from "react-icons/cg";

const Settings = () => {
  const { user, updateUserDetail } = UserAuth();
  const [stateInput, setStateInput] = useState({
    name: user.displayName ? user.displayName : localStorage.getItem("name"),
    email: localStorage.getItem("email"),
    password: "",
  });
  const [isChange, setIsChange] = useState(false);
  const provider = localStorage.getItem("provider");
  useEffect(() => {
    let time = setTimeout(() => {
      setIsChange(false);
    }, 2000);

    return () => {
      clearTimeout(time);
    };
  }, [isChange]);
  const handleChangeInput = (e) => {
    const value = e.target.value;

    setStateInput((prevState) => {
      return {
        ...prevState,
        [e.target.name]: value,
      };
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    localStorage.setItem("name", stateInput.name);
    localStorage.setItem("email", stateInput.email);

    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: stateInput.name,
    })
      .then(() => {
        setIsChange(true);
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
    if (user.email !== stateInput.email) {
      updateEmail(auth.currentUser, stateInput.email)
        .then(() => {
          setIsChange(true);
          updateUserDetail(user.uid, stateInput.name, stateInput.email);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (stateInput.password !== "") {
      updatePassword(auth.currentUser, stateInput.password)
        .then(() => {
          setIsChange(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <section className="max-w-screen-sm	mt-4 mx-auto	">
      {isChange && (
        <div className="relative z-40">
          <div className="fixed  right-0 p-8 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 border border-solid border-black">
            <div className="flex justify-center align-center items-center">
              <span className="pr-2">Dane zostały zmienione.</span>
              <CgCheckO size={25} color="green" />
            </div>
          </div>
        </div>
      )}
      <h2 className="font-bold text-2xl text-center mb-8">
        Zmień ustawienia użytkownika
      </h2>
      <div className="flex align justify-center items-center mb-4">
        <div className="self-center	">
          <img src={userIcon} alt="profil" className="px-4 ml-auto " />
        </div>
        <span>{user.email}</span>
      </div>

      <form className="mx-auto" onSubmit={handleSubmitForm}>
        <div className="mb-4">
          <Input
            text="Nazwa użytkownika:"
            type="text"
            name="name"
            value={stateInput.name}
            onChange={handleChangeInput}
          />
        </div>
        <div className="mb-4">
          <Input
            text="Email:"
            type="email"
            name="email"
            autoComplete="current-email"
            value={stateInput.email}
            onChange={handleChangeInput}
            disabled={provider == "yes"}
            placeholder={provider == "yes" ? user.email : stateInput.email}
          />
        </div>
        {
          <div className="mb-4">
            <Input
              text="Hasło:"
              type="password"
              name="password"
              autoComplete="current-password"
              value={stateInput.password}
              onChange={handleChangeInput}
              disabled={provider == "yes"}
              placeholder={
                provider == "yes" ? "Hasło google nie może być zmienione!" : ""
              }
            />
          </div>
        }

        <div className="mb-4 w-1/3 mx-auto">
          <ButtonFill type="submit">Zapisz</ButtonFill>
        </div>
      </form>
    </section>
  );
};

export default Settings;
