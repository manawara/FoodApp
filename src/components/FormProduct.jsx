import Input from "./UI/Input.jsx";
import { ButtonFill, ButtonSelectFilter } from "./UI/Button.jsx";
import { useState } from "react";
import { UseProjectContext } from "../context/ProjectContext";

const FormProduct = () => {
  const [stateInput, setStateInput] = useState({
    name: "",
    nutritionalValue: "",
    portion: "",
    energyValue: "",
    type: "",
    fats: "",
    carbs: "",
    proteins: "",
  });
  const { addProduct } = UseProjectContext();
  const handleChangeInput = (e) => {
    const value = e.target.value;
    const typeValue = e.target.type;

    setStateInput((prevState) => {
      return {
        ...prevState,
        [e.target.name]:
          typeValue === "text" || typeValue === "select-one"
            ? value
            : parseFloat(value),
      };
    });
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    addProduct(stateInput);
    setStateInput({
      name: "",
      nutritionalValue: "",
      portion: "",
      energyValue: "",
      type: "",
      fats: "",
      carbs: "",
      proteins: "",
    });
  };

  return (
    <div className="pt-6">
      <form className="mx-auto" onSubmit={handleSubmitForm}>
        <div className="mb-4">
          <Input
            text="Nazwa"
            type="text"
            name="name"
            value={stateInput.name}
            onChange={handleChangeInput}
            required
          />
        </div>
        <div className="mb-4">
          <ButtonSelectFilter
            name="nutritionalValue"
            value={stateInput.nutritionalValue}
            onChange={handleChangeInput}
            options={[
              { label: "100 g", value: 100 },
              { label: "Porcja", value: "porcja" },
            ]}
            label="Wartości odżywcze na"
          />
        </div>
        <div className="mb-4">
          <ButtonSelectFilter
            name="type"
            value={stateInput.type}
            onChange={handleChangeInput}
            options={[
              { label: "Owoc", value: "Owoc" },
              { label: "Mięso", value: "Mięso" },
              { label: "Warzywa", value: "Warzywa" },
              { label: "Sery", value: "Sery" },
              { label: "Przekąski", value: "Przekąski" },
            ]}
            label="Rodzaj"
          />
        </div>
        {stateInput.nutritionalValue === "porcja" && (
          <div className="mb-4">
            <Input
              text="Porcja ma (ilość gram):"
              type="number"
              name="portion"
              value={stateInput.portion}
              onChange={handleChangeInput}
              required
            />
          </div>
        )}
        <div className="mb-4">
          <Input
            text="Wartość energetyczna (kcal):"
            type="number"
            name="energyValue"
            value={stateInput.energyValue}
            onChange={handleChangeInput}
            required
          />
        </div>
        <div className="mb-4">
          <Input
            text="Tłuszcze (g):"
            type="number"
            name="fats"
            value={stateInput.fats}
            onChange={handleChangeInput}
            required
          />
        </div>
        <div className="mb-4">
          <Input
            text="Węglowodany (g):"
            type="number"
            name="carbs"
            value={stateInput.carbs}
            onChange={handleChangeInput}
            required
          />
        </div>
        <div className="mb-4">
          <Input
            text="Białko (g):"
            type="number"
            name="proteins"
            value={stateInput.proteins}
            onChange={handleChangeInput}
            required
          />
        </div>
        <div className="mb-4 w-1/3 mx-auto">
          <ButtonFill type="submit">Zapisz</ButtonFill>
        </div>
      </form>
    </div>
  );
};

export default FormProduct;
