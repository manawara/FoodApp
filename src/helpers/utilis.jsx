import React from "react";

// options for Calendar
export const options = {
  title: "Wybierz dzień",
  autoHide: true,
  todayBtn: true,
  clearBtn: true,
  clearBtnText: "Wyczyść",
  maxDate: new Date("2030-01-01"),
  minDate: new Date("1950-01-01"),
  theme: {
    background: "!bg-stone-200",
    todayBtn: "!bg-stone-700 ",
    clearBtn: "!bg-stone-700 ",
    icons: "!bg-transparent !text-black",
    text: "!text-black ",
    disabledText: "!text-gray-500",
    input: "!bg-stone-700 cursor-pointer",
    inputIcon: "!bg-stone-700",
    selected: "!bg-stone-700",
  },
  icons: {
    // () => ReactElement | JSX.Element
    prev: () => (
      <span>
        <svg
          className="w-4 h-4"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </span>
    ),
    next: () => (
      <span>
        <svg
          className="w-4 h-4"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </span>
    ),
  },
  datepickerClassNames: "top-22",
  defaultDate: false,
  language: "pl",
  disabledDates: [],
  weekDays: ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Niedz"],
  inputNameProp: "date",
  inputIdProp: "date",
  inputPlaceholderProp: "Wybierz dzień",
  inputDateFormatProp: {
    day: "numeric",
    month: "long",
    year: "numeric",
  },
};
