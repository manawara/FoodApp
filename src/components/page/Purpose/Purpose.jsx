import React, { useState } from "react";
import PurposeForm from "./PurposeForm";
import { UserAuth } from "../../../context/AuthContext";
import { getFormattedDate, calculatePurpose } from "../../../helpers/helpers";
import { Chart } from "react-google-charts";

const Purpose = () => {
  const { userDetail, updateUser, user } = UserAuth();

  const [dataForm, setDataForm] = useState({
    currentWeight: userDetail.currentWeight,
    targetWeight: userDetail.targetWeight,
    trainingActivity: userDetail.trainingActivity,
    changeWeight: userDetail.changeWeight,
    activityDay: userDetail.activityDay,
  });
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
  const handleSubmitForm = (e) => {
    e.preventDefault();
    updateUser(user.uid, dataForm);
  };

  const addWeeksToDate = (dateObj, numberOfWeeks) => {
    const dataSplit = dateObj.split("-");
    const newData = new Date(dataSplit[2], dataSplit[1] - 1, dataSplit[0]);
    newData.setDate(newData.getDate() + numberOfWeeks * 7);
    return getFormattedDate(newData);
  };
  const weeks = calculatePurpose(
    userDetail.targetWeight,
    userDetail.currentWeight,
    userDetail.changeWeight,
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div>
        {userDetail && (
          <PurposeForm
            userDetail={userDetail}
            dataForm={dataForm}
            onSubmitForm={handleSubmitForm}
            onChangeForm={handleChangeInput}
          />
        )}
      </div>
      <div className="mt-4 sm:mt-0 bg-stone-200 p-4 text-center">
        <div className="font-bold mb-2">Prognoza osiągniecia celu</div>
        <div className=" font-bold text-lg">
          Termin:{" "}
          {userDetail.createdAt &&
            addWeeksToDate(userDetail.createdAt, parseInt(weeks))}{" "}
          ({weeks} tyg)
        </div>

        <div className="max-w-[600px]">
          <Chart
            chartType="LineChart"
            data={[
              ["Tygodnie", "Waga"],

              [1, parseInt(userDetail.currentWeight)],
              [weeks, userDetail.targetWeight],
            ]}
            width="100%"
            height="500px"
            options={{
              hAxis: {
                title: "Tygodnie",
              },
              vAxis: {
                title: "Waga aktualna",
              },
              backgroundColor: "transparent",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Purpose;
