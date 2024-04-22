import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

import { storage } from "../../../config/firebase";
import { CgArrowLeftO, CgCheckO } from "react-icons/cg";
import { MdOutlinePhotoCamera } from "react-icons/md";
import Input, { InputFile } from "../../UI/Input";
import { ButtonFill } from "../../UI/Button";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "../../Modal";
import Product from "../Product/Product";
import { calculateEditValue, totalIngredient } from "../../../helpers/helpers";
import { UserAuth } from "../../../context/AuthContext";
import { UseProjectContext } from "../../../context/ProjectContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RecipeAdd = () => {
  const [recipe, setRecipe] = useState({
    name: "",
    timeDuration: "",
    preparation: "",
    imageFile: "",
    products: [],
  });
  const [isAdd, setIsAdd] = useState(false);
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [isShowPopupEdit, setIsShowPopupEdit] = useState(false);
  const [stateInput, setStateInput] = useState({});
  const { user } = UserAuth();

  const { addRecipe } = UseProjectContext();

  const handleClickEdit = (item) => {
    setStateInput({ ...item, nutritionalValueOld: item.nutritionalValue });
    setIsShowPopupEdit((prevState) => {
      return !prevState;
    });
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();

    const array = recipe.products.filter((obj) => obj.pid !== stateInput.pid);
    const objIndex = recipe.products.findIndex(
      (obj) => obj.pid === stateInput.pid,
    );
    const object = recipe.products[objIndex];
    object.nutritionalValueOld = parseFloat(object.nutritionalValue);
    object.nutritionalValue = parseFloat(stateInput.nutritionalValue);

    const fats = calculateEditValue(
      object.nutritionalValueOld,
      object.nutritionalValue,
      object.fats,
    );
    const energyValue = (object.energyValue = calculateEditValue(
      object.nutritionalValueOld,
      object.nutritionalValue,
      object.energyValue,
    ));
    const proteins = (object.proteins = calculateEditValue(
      object.nutritionalValueOld,
      object.nutritionalValue,
      object.proteins,
    ));
    const carbs = (object.carbs = calculateEditValue(
      object.nutritionalValueOld,
      object.nutritionalValue,
      object.carbs,
    ));
    const newObj = { ...object, fats, energyValue, proteins, carbs };
    if (object.nutritionalValueOld !== object.nutritionalValue) {
      setRecipe((prevState) => {
        return {
          ...prevState,
          products: [newObj, ...array],
        };
      });
      setIsShowPopupEdit(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const typeValue = e.target.type;
    setRecipe((prevState) => {
      return {
        ...prevState,
        [e.target.name]:
          typeValue === "text" || typeValue === "select-one"
            ? value
            : parseFloat(value),
      };
    });
  };

  const handleChangeFile = (e) => {
    setRecipe((prevState) => {
      return {
        ...prevState,
        ["imageFile"]: e.target.files[0],
      };
    });
  };

  const handleQuillEdit = (value) => {
    setRecipe((prev) => {
      return {
        ...prev,
        preparation: value,
      };
    });
  };
  const handleClickShow = () => {
    setIsShowPopup((prevState) => {
      return !prevState;
    });
  };
  const handleClickShowEdit = () => {
    setIsShowPopupEdit((prevState) => {
      return !prevState;
    });
  };

  const handleChangeInput = (e) => {
    const value = e.target.value;

    setStateInput((prevState) => {
      return {
        ...prevState,
        [e.target.name]: value,
      };
    });
  };
  const handleClickSelectRecipe = (data) => {
    setRecipe((prevState) => {
      return {
        ...prevState,
        products: [...prevState.products, { ...data, pid: uuidv4() }],
      };
    });
  };

  const handleClickDelete = (id) => {
    const arr = recipe.products.filter((item) => item.id !== id);
    setRecipe((prevState) => {
      return {
        ...prevState,
        products: arr,
      };
    });
  };

  const handleFormSubmit = (e) => {
    if (
      recipe.preparation &&
      recipe.timeDuration &&
      recipe.name &&
      recipe.products.length > 0
    ) {
      const totalAllProteins = totalIngredient("proteins", "", recipe.products);
      const totalAllCarbs = totalIngredient("carbs", "", recipe.products);
      const totalAllFats = totalIngredient("fats", "", recipe.products);
      const totalAllEnergyValue = totalIngredient(
        "energyValue",
        "",
        recipe.products,
      );
      const totalNutritionalValue = totalIngredient(
        "nutritionalValue",
        "",
        recipe.products,
      );
      if (recipe.imageFile !== "") {
        const storageRef = ref(storage, `/images/${recipe.imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, recipe.imageFile);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
            );
          },
          (err) => console.log(err),
        );
      }

      const obj = {
        ...recipe,
        carbs: totalAllCarbs,
        energyValue: totalAllEnergyValue,
        fats: totalAllFats,
        proteins: totalAllProteins,
        nutritionalValue: totalNutritionalValue,
        imageFile: `${recipe.imageFile !== "" ? recipe.imageFile.name : ""}`,
        pid: uuidv4(),
      };
      addRecipe(obj, user.uid);

      setIsAdd(true);
      setRecipe({
        name: "",
        timeDuration: "",
        imageFile: "",
        preparation: "",
        products: [],
      });
    }
  };
  useEffect(() => {
    let time = setTimeout(() => {
      setIsAdd(false);
    }, 2000);

    return () => {
      clearTimeout(time);
    };
  }, [isAdd]);

  return (
    <div>
      {isAdd && (
        <div className="relative z-20">
          <div className="fixed z-20 sm:max-w-[360px]  right-0 p-8 top-1/2 left-1/2 sm:left-[61%] transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 border border-solid border-black">
            <div className="flex z-20 justify-center align-center items-center">
              <span className="pr-2">Przepis został dodany</span>
              <CgCheckO size={25} color="green" />
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center">
        <Link to="/recipes" className="flex items-center">
          <CgArrowLeftO size={32} />
          <span className="ml-2"> Wróć</span>
        </Link>
      </div>

      <div className="max-w-[320px] mx-auto">
        <h2 className="text-center font-bold text-lg mb-6">
          Dodaj nową potrawę
        </h2>

        <div className="bg-gray-200 p-4 my-2  text-center">
          <MdOutlinePhotoCamera size={28} className="mx-auto" />
          <InputFile
            text="+ Dodaj zdjęcie"
            idInput="image"
            type="file"
            name="imageFile"
            onChange={handleChangeFile}
          />

          <div>
            {recipe.imageFile.name !== undefined &&
              "Dodano obrazek " + recipe.imageFile.name}
          </div>
        </div>
        <div className="flex my-4">
          <Input
            text="Nazwa potrawy"
            type="text"
            name="name"
            value={recipe.name}
            smallInput
            onChange={handleChange}
          />
        </div>
        <div className="flex my-4">
          <Input
            text="Łączny czas przygotowania"
            type="number"
            name="timeDuration"
            value={recipe.timeDuration}
            smallInput
            onChange={handleChange}
          />
          <div className="self-center ml-2">min</div>
        </div>
        <div className="my-2">Dodaj składniki*</div>
        <div>
          {recipe.products.map((item) => (
            <div
              className="bg-gray-200 pt-8 pb-2   px-4  relative"
              key={item.id + Math.floor(Math.random() * 100)}
            >
              <div className="absolute right-3 top-2">
                <AiOutlineClose
                  onClick={() => handleClickDelete(item.id)}
                  className="cursor-pointer"
                />
              </div>
              <div className="flex justify-between">
                <div>{item.name}</div>
                <div>{item.energyValue} kcal</div>
                <button
                  onClick={() =>
                    handleClickEdit({
                      name: item.name,
                      nutritionalValue: item.nutritionalValue,
                      pid: item.pid,
                    })
                  }
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-200 p-4 text-center">
          <button onClick={handleClickShow}>+ Dodaj składnik</button>
        </div>

        <div className="h-[200px]">
          <div className="my-2">Instrukcja przygotowania</div>
          <ReactQuill
            className="h-[100px]"
            theme="snow"
            name="preparation"
            value={recipe.preparation}
            onChange={handleQuillEdit}
          />
        </div>

        <div className="w-1/2 mx-auto mt-4">
          <ButtonFill isOpen={handleFormSubmit}>Zapisz</ButtonFill>
        </div>
      </div>
      {isShowPopup && (
        <Modal open onCloseModal={handleClickShow} size="28" large>
          <Product isRecipe onSelectRecipe={handleClickSelectRecipe} />
        </Modal>
      )}
      {isShowPopupEdit && (
        <Modal open onCloseModal={handleClickShowEdit} size="28" large>
          <div className="pt-4">
            <form className="mx-auto" onSubmit={handleSubmitEdit}>
              <div className="mb-4 mt-4">
                <div className="mb-4">Nazwa składnika: {stateInput.name}</div>
                <div className="mb-4">
                  <Input
                    text="Ilość gram:"
                    type="number"
                    name="nutritionalValue"
                    value={stateInput.nutritionalValue}
                    onChange={handleChangeInput}
                    min="1"
                    required
                  />
                </div>
                <div className="mb-4 w-1/3 mx-auto">
                  <ButtonFill type="submit">Zapisz</ButtonFill>
                </div>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default RecipeAdd;
