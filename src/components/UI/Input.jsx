import React from "react";

const Input = React.forwardRef(
  (
    {
      type,
      name,
      value,
      text,
      idInput,
      placeholder,
      icon,
      smallInput,
      required,
      ...props
    },
    ref,
  ) => {
    let Icon = icon;

    return (
      <div
        className={`relative ${smallInput ? "grid grid grid-cols-[70%,30%] items-center" : ""} `}
      >
        {text && <label htmlFor={idInput}>{text}</label>}
        <input
          ref={ref}
          id={idInput}
          name={name}
          value={value}
          type={type}
          placeholder={placeholder}
          required={required}
          {...props}
          className="bg-gray-100 border border-gray-300 text-stone-900 focus:outline-none focus:ring-1 focus:ring-black text-sm rounded-lg block w-full p-2"
        />
        {Icon && (
          <Icon className="absolute top-2/4 -translate-y-1/2 right-3 " />
        )}
      </div>
    );
  },
);

export const InputFile = React.forwardRef(
  (
    { type, name, value, text, idInput, placeholder, icon, required, ...props },
    ref,
  ) => {
    let Icon = icon;

    return (
      <div className="relative">
        {text && (
          <label htmlFor={idInput} className="cursor-pointer hover:">
            {text}
          </label>
        )}
        <input
          ref={ref}
          id={idInput}
          name={name}
          value={value}
          type={type}
          placeholder={placeholder}
          required={required}
          {...props}
          className="hidden"
        />
        {Icon && (
          <Icon className="absolute top-2/4 -translate-y-1/2 right-3 " />
        )}
      </div>
    );
  },
);
export default Input;
