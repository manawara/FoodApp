const ProgressBar = ({ name, currentValue, totalValue, ext }) => (
  <div className="m-2 flex flex-col ">
    <label
      htmlFor="file"
      className="text-lg
 font-bold mr-4"
    >
      {name}{" "}
      <span className={`font-normal `}>
        {currentValue} / {totalValue !== "NaN" ? totalValue : 0} {ext}
      </span>
    </label>
    <progress
      id="file"
      className={`w-full block [&::-webkit-progress-bar]:rounded [&::-webkit-progress-value]:rounded   ${parseInt(currentValue) > parseInt(totalValue) ? "[&::-webkit-progress-value]:bg-red-500" : "[&::-webkit-progress-value]:bg-green-500"}`}
      value={currentValue}
      max={totalValue}
    >
      %
    </progress>
  </div>
);

export default ProgressBar;
