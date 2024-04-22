import { useState } from "react";
import RecipeContent from "./RecipeContent";
import { IoIosAddCircle } from "react-icons/io";

import { Link } from "react-router-dom";

const Recipes = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClickModalBox = () => {
    setShowModal((prevState) => !prevState);
  };

  return (
    <>
      <h2 className="text-center font-bold text-xl mb-2">Przepisy</h2>
      <div className="flex justify-center cursor-pointer mb-6">
        <Link to="/recipe-add">
          <IoIosAddCircle
            size={36}
            color="#078e36"
            className="hover:scale-125 transition time-duration-300"
          />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-8 justify-items-center lg:grid-cols-3 xl:grid-cols-4	">
        <RecipeContent onModal={handleClickModalBox} showModal={showModal} />
      </div>
    </>
  );
};

export default Recipes;
