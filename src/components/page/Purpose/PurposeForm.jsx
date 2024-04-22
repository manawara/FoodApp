import Input from "../../UI/Input";
import { ButtonFill, ButtonSelectFilter } from "../../UI/Button";

const PurposeForm = ({ dataForm, onSubmitForm, onChangeForm, userDetail }) => {
  return (
    <>
      <form className="p-8 bg-stone-200" onSubmit={onSubmitForm}>
        <div className="mb-4">
          <Input
            text="Masa ciała aktualna:"
            type="number"
            name="currentWeight"
            value={dataForm.currentWeight}
            onChange={onChangeForm}
          />
        </div>
        <div className="mb-4">
          <Input
            text="Masa ciała docelowa:"
            type="number"
            name="targetWeight"
            value={dataForm.targetWeight}
            onChange={onChangeForm}
          />
        </div>
        <div className="pb-4">
          <ButtonSelectFilter
            isWhite
            name="activityDay"
            value={dataForm.activityDay}
            onChange={onChangeForm}
            options={[
              { label: "niska", value: "low" },
              { label: "średnia", value: "medium" },
              { label: "wysoka", value: "high" },
            ]}
            label="Aktywność w ciągu dnia"
          />
        </div>
        <div className="mb-4">
          <ButtonSelectFilter
            isWhite
            name="trainingActivity"
            value={dataForm.trainingActivity}
            onChange={onChangeForm}
            options={[
              { label: "niska", value: "low" },
              { label: "średnia", value: "medium" },
              { label: "wysoka", value: "high" },
            ]}
            label="Aktywność treningowa"
          />
        </div>
        <div className="mb-4">
          <Input
            text="Tempo zmiana masy ciała / tyg:"
            type="number"
            step="0.1"
            min="0.1"
            max="1"
            name="changeWeight"
            value={dataForm.changeWeight}
            onChange={onChangeForm}
          />
        </div>
        <div className="w-max-8">
          <ButtonFill type="submit">Zapisz</ButtonFill>
        </div>
      </form>
    </>
  );
};

export default PurposeForm;
