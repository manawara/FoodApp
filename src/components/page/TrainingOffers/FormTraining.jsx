import { useState } from "react";
import Input from "../../UI/Input";
import { ButtonFill } from "../../UI/Button";

import { YouTubeGetID } from "../../../helpers/helpers";
const FormTraining = ({ onAdd }) => {
  const [stateInput, setStateInput] = useState("");
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
    const ytLink = YouTubeGetID(stateInput.movie);
    onAdd(ytLink, stateInput.title);
  };
  return (
    <>
      <form onSubmit={handleSubmitForm}>
        <h3 className="text-center font-bold text-lg mb-4">
          Dodaj propozycję treningową
        </h3>
        <div className="mb-4">
          <Input
            text="Tytuł:"
            type="text"
            name="title"
            value={stateInput.title}
            onChange={handleChangeInput}
            required
          />
        </div>
        <div className="mb-8">
          <Input
            text="Link do filmu:"
            type="text"
            name="movie"
            value={stateInput.movie}
            onChange={handleChangeInput}
            required
          />
        </div>

        <ButtonFill type="submit">Wyślij</ButtonFill>
      </form>
    </>
  );
};

export default FormTraining;
