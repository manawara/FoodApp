export const Button = ({ children, isOpen, icon, ...props }) => {
  const Icon = icon;
  return (
    <button
      onClick={isOpen}
      className="hover:text-gray-600 text-gray-800 font-bold py-2 pl-1 inline-flex items-center  active:scale-95 transition-transform"
      {...props}
    >
      {Icon && <Icon className="size-8" />}
      {children}
    </button>
  );
};

export const ButtonSelectFilter = ({
  label,
  value,
  options,
  onChange,
  name,
  isWhite,
  wFull,
}) => {
  return (
    <label htmlFor={name} className="block mb-2 text-sm font-medium">
      {label && (
        <div className=" inline-block text-gray-800 font-bold pr-3">
          {label}:
        </div>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`${isWhite ? "bg-white border border-gray-300" : "bg-gray-100"} hover:text-gray-600 text-gray-800 font-bold p-2.5 inline-flex items-center rounded-lg ${wFull ? "w-full" : ""}`}
        required
      >
        <option value="">Wybierz</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};
export const ButtonOutline = ({ children }) => {
  return (
    <button className="bg-stone-200 hover:bg-stone-300 text-black font-semibold py-1.5 px-4 border border-gray-400 rounded shadow">
      {children}
    </button>
  );
};
export const ButtonFill = ({ children, isOpen }) => {
  return (
    <button
      onClick={isOpen}
      className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-stone-700 rounded-md hover:bg-stone-600 focus:outline-none focus:bg-stone-600"
    >
      {children}
    </button>
  );
};
export default Button;
