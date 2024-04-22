import Modal from "./Modal.jsx";
import Input from "./UI/Input.jsx";
import { ButtonFill, ButtonSelectFilter } from "./UI/Button.jsx";
import { useState, useEffect } from "react";
import { UseProjectContext } from "../context/ProjectContext";
import { UserAuth } from "../context/AuthContext.jsx";

const MyPurpose = () => {
  const { activate, updateUser, user } = UserAuth();
  const [showComponent, setShowComponent] = useState(false);

  const [dataForm, setDataForm] = useState({
    currentWeight: "",
    targetWeight: "",
    trainingActivity: "",
    changeWeight: "",
    activityDay: "",
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowComponent(true);
    }, 3500);

    return () => clearTimeout(timeout);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    updateUser(user.uid, dataForm);
  };
  const handleChangeInput = (e) => {
    const value = e.target.value;
    const typeValue = e.target.type;
    setDataForm((prevState) => {
      return {
        ...prevState,
        [e.target.name]:
          typeValue === "text" || typeValue === "select-one"
            ? value
            : parseFloat(value),
      };
    });
  };

  if (!activate)
    return (
      <>
        {showComponent && (
          <Modal open>
            <span className="text-center block text-xl font-bold">Mój cel</span>
            <form onSubmit={handleSubmit}>
              <div className="py-4">
                <Input
                  text="Masa ciała aktualna (kg)"
                  type="number"
                  name="currentWeight"
                  value={dataForm.currentWeight}
                  onChange={handleChangeInput}
                />
              </div>
              <div className="pb-4">
                <Input
                  text="Masa docelowa (kg)"
                  className="pb-4"
                  type="number"
                  name="targetWeight"
                  value={dataForm.targetWeight}
                  onChange={handleChangeInput}
                />
              </div>
              <div className="pb-6">
                <Input
                  text="Tempo zmiany masy (tygodniowo w kg)"
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="1"
                  name="changeWeight"
                  value={dataForm.changeWeight}
                  onChange={handleChangeInput}
                />
              </div>
              <div className="pb-4">
                <ButtonSelectFilter
                  name="trainingActivity"
                  value={dataForm.trainingActivity}
                  onChange={handleChangeInput}
                  options={[
                    { label: "niska", value: "low" },
                    { label: "średnia", value: "medium" },
                    { label: "wysoka", value: "high" },
                  ]}
                  label="Aktywność treningowa"
                />
              </div>
              <div className="pb-4">
                <ButtonSelectFilter
                  name="activityDay"
                  value={dataForm.activityDay}
                  onChange={handleChangeInput}
                  options={[
                    { label: "niska", value: "low" },
                    { label: "średnia", value: "medium" },
                    { label: "wysoka", value: "high" },
                  ]}
                  label="Aktywność w ciągu dnia"
                />
              </div>
              <div className="w-1/2 mx-auto">
                <ButtonFill type="submit">Dodaj</ButtonFill>
              </div>
            </form>
          </Modal>
        )}
      </>
    );
};

export default MyPurpose;
