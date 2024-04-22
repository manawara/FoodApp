import { useState } from "react";
import { ButtonFill } from "../../UI/Button.jsx";
import YouTube from "react-youtube";
import Modal from "../../Modal";
import FormTraining from "./FormTraining";
import { UseProjectContext } from "../../../context/ProjectContext";
const opts = {
  height: "150",
  width: "280",
};
const TrainingOffers = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { trainingOffer, addOffer } = UseProjectContext();

  const handleOpenModal = () => {
    setIsOpen((prevState) => {
      return !prevState;
    });
  };
  return (
    <div className="flex flex-col">
      <h2 className="text-center font-bold text-2xl mb-4">
        Propozycje treningowe
      </h2>
      <div className="grid gap-8 mx-auto grid-cols-1 lg:grid-cols-3">
        {trainingOffer &&
          trainingOffer.map((item) => (
            <div key={item.title + item.link}>
              <h3 className="text-center mb-4 font-bold">{item.title}</h3>
              <YouTube videoId={item.link} opts={opts} />
            </div>
          ))}
      </div>
      <div className="max-w-40 mt-8 mx-auto">
        <ButtonFill isOpen={handleOpenModal}>Dodaj</ButtonFill>
      </div>
      <Modal open={isOpen} onCloseModal={handleOpenModal}>
        <FormTraining onAdd={addOffer} />
      </Modal>
    </div>
  );
};

export default TrainingOffers;
