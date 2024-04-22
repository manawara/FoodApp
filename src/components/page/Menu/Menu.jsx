import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import Datepicker from "tailwind-datepicker-react";
import Accordion from "../../Accordion/Accordion.jsx";

import ProgressBar from "../../ProgressBar.jsx";
import { UseProjectContext } from "../../../context/ProjectContext.jsx";
import { UserAuth } from "../../../context/AuthContext.jsx";
import { getFormattedDate, totalIngredient } from "../../../helpers/helpers.js";
import { options } from "../../../helpers/utilis.jsx";
import Modal from "../../Modal";
import MenuEdit from "./MenuEdit";
import {
  calculateEditValue,
  calculateCaloric,
  calculateBMR,
  calculatePAL,
  calculateDeficiency,
  calculateNutritionalValues,
} from "../../../helpers/helpers";

const initDate = new Date();
const Menu = () => {
  const [show, setShow] = useState(false);
  const [selectDate, setSelectDate] = useState(initDate);
  const [userProduct, setUserProduct] = useState([]);
  const [userProductEdit, setUserProductEdit] = useState([]);

  const [userProductALL, setUserProductALL] = useState([]);

  const { user, userDetail } = UserAuth();
  const { addMeals } = UseProjectContext();
  const [showPopup, setShowPopup] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const handleClickShowPopup = (name) => {
    setShowPopup((prevState) => !prevState);
    addMeals(name);
  };
  const handleOpenEditModal = (id) => {
    setIsOpenEdit((prevState) => {
      return !prevState;
    });

    const editItem = userProductALL.filter((item) => item.pid === id);

    setUserProductEdit(...editItem);
  };
  const handleChange = (date) => {
    setSelectDate(date);
  };
  const handleClose = (state) => {
    setShow(state);
  };

  const addProductToListUser = async () => {
    try {
      const usersRef = collection(db, "users");
      const data = await getDocs(usersRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const convertDate = getFormattedDate(selectDate);
      const findProducts = filteredData.find((obj) => obj.email === user.email);

      if (findProducts.product !== "undefined") {
        setUserProduct(
          findProducts.product.filter(
            (item) => item.selectDate === convertDate,
          ),
        );
        setUserProductALL(findProducts.product);
      } else {
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    addProductToListUser();
  }, [selectDate, user, showPopup]);

  const deleteUserProduct = async (id, userID, data) => {
    const deleteItem = userProductALL.filter((item) => item.pid !== id);
    const productRef = doc(db, "users", userID);
    await updateDoc(productRef, {
      product: deleteItem,
    });
    addProductToListUser();
  };
  const editUser = async (data) => {
    const energyValue = calculateEditValue(
      data.nutritionalValueOld,
      data.nutritionalValue,
      data.energyValue,
    );
    const carbs = calculateEditValue(
      data.nutritionalValueOld,
      data.nutritionalValue,
      data.carbs,
    );
    const fats = calculateEditValue(
      data.nutritionalValueOld,
      data.nutritionalValue,
      data.fats,
    );
    const proteins = calculateEditValue(
      data.nutritionalValueOld,
      data.nutritionalValue,
      data.proteins,
    );

    const arr = userProductALL.filter((el) => el.pid !== data.pid);
    const newData = [
      ...arr,
      { ...data, energyValue, carbs, fats, proteins, pid: uuidv4() },
    ];

    const productRef = doc(db, "users", user.uid);
    await updateDoc(productRef, {
      product: newData,
    });
    setIsOpenEdit(false);
    addProductToListUser();
  };
  const BMR = calculateBMR(parseInt(userDetail.currentWeight));
  const PAL = calculatePAL(userDetail.activityDay, userDetail.trainingActivity);
  const deficit = calculateDeficiency(
    userDetail.changeWeight,
    userDetail.currentWeight,
    userDetail.targetWeight,
  );
  const caloric = calculateCaloric(BMR, PAL, deficit);
  const nutritional = calculateNutritionalValues(caloric);

  const breakFast = userProduct.filter((el) => el.type === "breakfast");
  const lunch = userProduct.filter((el) => el.type === "lunch");
  const dinner = userProduct.filter((el) => el.type === "dinner");
  const supper = userProduct.filter((el) => el.type === "supper");

  const total = (name, array) => {
    const totalCarbsDay = totalIngredient("carbs", name, array);
    const totalFatsDay = totalIngredient("fats", name, array);
    const totalProteinsDay = totalIngredient("proteins", name, array);
    const totalEnergyValueDay = totalIngredient("energyValue", name, array);

    return {
      totalCarbsDay: totalCarbsDay,
      totalFatsDay: totalFatsDay,
      totalProteinsDay: totalProteinsDay,
      totalEnergyValueDay: totalEnergyValueDay,
    };
  };

  const totalAllProteins = totalIngredient("proteins", "", userProductALL);
  const totalAllCarbs = totalIngredient("carbs", "", userProductALL);
  const totalAllFats = totalIngredient("fats", "", userProductALL);
  const totalAllEnergyValue = totalIngredient(
    "energyValue",
    "",
    userProductALL,
  );

  return (
    <div className="flex flex-col w-full items-center ">
      <div className="mb-4 self-start flex ">
        <Datepicker
          options={options}
          onChange={handleChange}
          show={show}
          setShow={handleClose}
        />
      </div>
      <div className="flex w-full sm:ml-2 sm:ml-8 flex-col">
        <div>
          {userProduct && (
            <>
              <Accordion
                label="Śniadanie"
                name="breakfast"
                onClick={() => handleClickAccordion("breakfast")}
                selectDate={selectDate !== null ? selectDate : new Date()}
                data={breakFast}
                total={total("breakfast", userProduct)}
                onShowPopup={handleClickShowPopup}
                isShowPopup={showPopup}
                onDelete={deleteUserProduct}
                onEditItem={handleOpenEditModal}
              />

              <Accordion
                label="Drugie śniadanie"
                name="lunch"
                selectDate={selectDate !== null ? selectDate : new Date()}
                data={lunch}
                total={total("lunch", userProduct)}
                onShowPopup={handleClickShowPopup}
                isShowPopup={showPopup}
                onDelete={deleteUserProduct}
                onEditItem={handleOpenEditModal}
              />
              <Accordion
                label="Obiad"
                name="dinner"
                selectDate={selectDate !== null ? selectDate : new Date()}
                data={dinner}
                total={total("dinner", userProduct)}
                onShowPopup={handleClickShowPopup}
                isShowPopup={showPopup}
                onDelete={deleteUserProduct}
                onEditItem={handleOpenEditModal}
              />
              <Accordion
                label="Kolacja"
                name="supper"
                selectDate={selectDate !== null ? selectDate : new Date()}
                data={supper}
                total={total("supper", userProduct)}
                onShowPopup={handleClickShowPopup}
                isShowPopup={showPopup}
                onDelete={deleteUserProduct}
                onEditItem={handleOpenEditModal}
              />
            </>
          )}
        </div>
        <div className="p-4 bg-stone-200  mt-6 max-w-lg lg:ml-14 lg:mt-0 flex flex-col">
          <ProgressBar
            name="Kalorie"
            ext="Kcal"
            currentValue={totalAllEnergyValue}
            totalValue={caloric.toFixed(2).toString()}
          />
          <ProgressBar
            name="Białko"
            ext="g"
            currentValue={totalAllProteins.toString()}
            totalValue={nutritional.proteins.toString()}
          />
          <ProgressBar
            name="Tłuszcze"
            ext="g"
            currentValue={totalAllFats.toString()}
            totalValue={nutritional.fats.toString()}
          />
          <ProgressBar
            name="Węglowodany"
            ext="g"
            currentValue={totalAllCarbs.toString()}
            totalValue={nutritional.carbs.toString()}
          />
        </div>
      </div>
      <Modal open={isOpenEdit} onCloseModal={handleOpenEditModal}>
        {userProductEdit && (
          <MenuEdit data={userProductEdit} onEdit={editUser} />
        )}
      </Modal>
    </div>
  );
};
export default Menu;
