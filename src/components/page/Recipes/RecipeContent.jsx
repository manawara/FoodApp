import Box from "../../Box";
import Modal from "../../Modal";
import example from "../../../assets/example.jpg";
import { CgCheckO, CgTime } from "react-icons/cg";
import Input from "../../UI/Input";
import { ButtonSelectFilter, Button, ButtonFill } from "../../UI/Button";
import { getFormattedDate } from "../../../helpers/helpers";
import { CgArrowRightR } from "react-icons/cg";
import { UseProjectContext } from "../../../context/ProjectContext";
import { useEffect, useState } from "react";
import { UserAuth } from "../../../context/AuthContext";

const RecipeContent = ({ onModal, showModal }) => {
  const { recipe, addUserProduct, deleteRecipe } = UseProjectContext();
  const { user } = UserAuth();
  const [selectRecipe, setSelectRecipe] = useState(null);
  const [isAdd, setIsAdd] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const [selectInput, setSelectInput] = useState({
    timeDay: "",
    selectDate: "",
    portion: 1,
  });
  const handleClickRecipe = (data) => {
    setSelectRecipe(data);
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    let dateNew = getFormattedDate(
      new Date(new Date(selectInput.selectDate).toLocaleString("en-US")),
    );
    addUserProduct(
      {
        carbs: parseFloat(selectRecipe.carbs) * selectInput.portion,
        createdAT: new Date(),
        energyValue: parseFloat(selectRecipe.energyValue) * selectInput.portion,
        fats: parseFloat(selectRecipe.fats) * selectInput.portion,
        id: selectRecipe.id,
        name: selectRecipe.name,
        nutritionalValue:
          parseFloat(selectRecipe.nutritionalValue) * selectInput.portion,
        proteins: parseFloat(selectRecipe.proteins) * selectInput.portion,
      },
      user.uid,
      dateNew,
      selectInput.timeDay,
    );
    setIsAdd(true);
  };

  const handleOnChange = (e) => {
    setSelectInput((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  useEffect(() => {
    let time = setTimeout(() => {
      setIsAdd(false);
    }, 2000);

    return () => {
      clearTimeout(time);
    };
  }, [isAdd]);

  const handleClickDelete = (id) => {
    deleteRecipe(id);
    setIsDelete(true);
    onModal(false);
  };
  useEffect(() => {
    let time = setTimeout(() => {
      setIsDelete(false);
    }, 2000);

    return () => {
      clearTimeout(time);
    };
  }, [isDelete]);
  return (
    <>
      {recipe &&
        recipe.map((item, index) => (
          <Box
            onModal={onModal}
            key={item.pid}
            data={item}
            onClickItem={handleClickRecipe}
          />
        ))}

      {selectRecipe && (
        <Modal open={showModal} onCloseModal={onModal} isPadding large>
          <div>
            {isAdd && (
              <div className="relative z-20">
                <div className="fixed z-20  right-0 p-8 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 border border-solid border-black">
                  <div className="flex z-20 justify-center align-center items-center">
                    <span className="pr-2">Przepis został dodany</span>
                    <CgCheckO size={25} color="green" />
                  </div>
                </div>
              </div>
            )}
            {isDelete && (
              <div className="relative z-20">
                <div className="fixed z-20  right-0 p-8 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 border border-solid border-black">
                  <div className="flex z-20 justify-center align-center items-center">
                    <span className="pr-2">Przepis został usunięty</span>
                    <CgCheckO size={25} color="green" />
                  </div>
                </div>
              </div>
            )}
            <div
              className="h-48 bg-center bg-no-repeat bg-cover flex w-full "
              style={{ backgroundImage: `url(${example})` }}
            >
              <div className="flex  items-end py-2 w-full px-4 ">
                <span className="bg-white p-1 px-4 rounded-full text-sm">
                  {selectRecipe.energyValue} kcal
                </span>
                <div className="flex items-center bg-white ml-auto bg-white p-1 px-4 rounded-full text-sm">
                  <CgTime />
                  <span className="ml-2">{selectRecipe.timeDuration} min</span>
                </div>
              </div>
            </div>
            <div className="flex bg-black py-2 px-4">
              <form
                className="grid   grid-cols-1 sm:grid-cols-4 sm:grid-flow-col	gap-x-2 content-center"
                onSubmit={handleSubmitForm}
              >
                <div className="mb-4 text-slate-300 max-w-36 flex ">
                  <Input
                    type="number"
                    name="portion"
                    text="Porcja"
                    defaultValue={1}
                    onChange={handleOnChange}
                  />
                  <div className=" w-full text-slate-300 self-center mt-6 sm:mt-3 ml-2 min-w-[100px]">
                    ({selectRecipe.nutritionalValue} g)
                  </div>
                </div>

                <div className="mb-4 text-slate-300">
                  <span>Pora dnia</span>
                  <ButtonSelectFilter
                    required
                    name="timeDay"
                    wFull
                    onChange={handleOnChange}
                    options={[
                      { label: "Śniadanie", value: "breakfast" },
                      { label: "Drugie śniadanie", value: "lunch" },
                      { label: "Obiad", value: "dinner" },
                      { label: "Kolacja", value: "supper" },
                    ]}
                  />
                </div>

                <div className="mb-4 text-slate-300">
                  <Input
                    text="Dzień"
                    type="date"
                    name="selectDate"
                    onChange={handleOnChange}
                    required
                  />
                </div>
                <div className=" self-center">
                  <Button>
                    <CgArrowRightR
                      className="hover:scale-125 tranistion duration-300"
                      size={32}
                      color="white"
                    />
                  </Button>
                </div>
              </form>
              <div className="self-center">
                <ButtonFill isOpen={() => handleClickDelete(selectRecipe.id)}>
                  Usuń
                </ButtonFill>
              </div>
            </div>
            <div className="py-2 px-2">
              <h4 className="text-center text-lg font-bold">
                Wartości odżywcze
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3  text-center mt-2">
                <div>
                  <div className="font-bold">Białko</div>
                  <div className="my-2">{selectRecipe.proteins} g</div>
                </div>
                <div>
                  <div className="font-bold">Tłuszcze</div>
                  <div className="my-2">{selectRecipe.fats} g</div>
                </div>
                <div>
                  <div className="font-bold">Węglowodany</div>
                  <div className="my-2">{selectRecipe.carbs} g</div>
                </div>
              </div>
            </div>
            <div className="bg-black text-slate-300 p-4">
              <h5 className="text-center font-bold">Składniki odżywcze</h5>
              <ul className="grid  items-center px-2 sm:px-12 mt-2">
                {selectRecipe.products.map((item) => {
                  return (
                    <li key={item.pid} className="flex justify-between mb-2">
                      <div className="mr-2">{item.name}</div>
                      <div>{item.nutritionalValue} g</div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="p-4">
              <h6 className="text-center font-bold">Sposób przygotowania</h6>
              <ul className="grid  items-center px-2 mt-2">
                <li className="mb-2">
                  <div
                    className="mr-2"
                    dangerouslySetInnerHTML={{
                      __html: selectRecipe.preparation,
                    }}
                  ></div>
                </li>
              </ul>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default RecipeContent;
