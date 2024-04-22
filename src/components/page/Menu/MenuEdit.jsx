import Input from "../../UI/Input.jsx";
import { ButtonFill, ButtonSelectFilter } from "../../UI/Button.jsx";
import { useState } from "react";

const MenuEdit = ({ data, onEdit }) => {
  const [stateInput, setStateInput] = useState({
    ...data,
    name: data.name,
    portion: data.nutritionalValue,
    nutritionalValue: data.nutritionalValue,
    energyValue: data.energyValue,
    type: data.type,
    fats: data.fats,
    carbs: data.carbs,
    proteins: data.proteins,
    pid: data.pid,
    nutritionalValueOld: data.nutritionalValue,
  });

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
    onEdit(stateInput);
  };
  return (
    <div className="pt-4">
      <form className="mx-auto" onSubmit={handleSubmitForm}>
        <div className="mb-4 mt-4">
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
        <div className="mb-4">
          <Input
            text="Wartość energetyczna (kcal):"
            type="number"
            name="energyValue"
            placeholder={stateInput.energyValue}
            disabled={true}
            required
          />
        </div>
        <div className="mb-4">
          <Input
            text="Tłuszcze (g):"
            type="number"
            name="fats"
            placeholder={stateInput.fats}
            disabled={true}
            onChange={handleChangeInput}
            required
          />
        </div>
        <div className="mb-4">
          <Input
            text="Węglowodany (g):"
            type="number"
            name="carbs"
            placeholder={stateInput.carbs}
            disabled={true}
            onChange={handleChangeInput}
            required
          />
        </div>
        <div className="mb-4">
          <Input
            text="Białko (g):"
            type="number"
            name="proteins"
            placeholder={stateInput.proteins}
            disabled={true}
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

export default MenuEdit;
