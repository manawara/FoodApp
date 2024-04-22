import logo from "/src/assets/logo.png";
import userIcon from "/src/assets/user.png";
import { CgFormatJustify } from "react-icons/cg";
import Button from "./UI/Button.jsx";
import { UserAuth } from "../context/AuthContext.jsx";

const Header = ({ onOpenAside }) => {
  const { user, userDetail } = UserAuth();

  return (
    <header className="bg-stone-300 fixed w-full z-10">
      <div className="inline-flex w-full mx-auto justify-between px-4  py-4 md:px-8 items-center">
        <div className="flex items-center">
          <img src={logo} alt="Logo be fit" className="size-10 md:size-14" />
          <h1 className="text-xl md:text-2xl pl-4 md:pl-8 font-bold">beFIT</h1>
        </div>
        <div className="flex items-center ml-auto">
          <p className=" hidden  sm:block font-bold items-center flex flex-col  sm:flex-row">
            Profil:
            <span className="pl-2 font-normal">
              {user.displayName ? user.displayName : userDetail.name}
            </span>
          </p>
          <img
            src={userIcon}
            alt="profil"
            className="px-4 ml-auto justify-self-end"
          />
        </div>
        <Button
          icon={CgFormatJustify}
          isOpen={onOpenAside}
          className="sm:hidden "
        />
      </div>
    </header>
  );
};

export default Header;
