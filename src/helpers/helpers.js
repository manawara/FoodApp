export const searchProduct = (data, name) => {
  return data.filter((product) =>
    product.name.toLowerCase().includes(name.toLowerCase()),
  );
};

export const filterProductCategory = (data, name) => {
  return data.filter((product) =>
    product.type.toLowerCase().includes(name.toLowerCase()),
  );
};

export const getFormattedDate = (date) => {
  const year = date.getFullYear();

  let month = (1 + date.getMonth()).toString();

  month = month.length > 1 ? month : "0" + month;

  let day = date.getDate().toString();
  day = day.length > 1 ? day : "0" + day;

  return day + "-" + month + "-" + year;
};

export const YouTubeGetID = (url) => {
  let ID = "";
  url = url
    .replace(/(>|<)/gi, "")
    .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if (url[2] !== undefined) {
    ID = url[2].split(/[^0-9a-z_\-]/i);
    ID = ID[0];
  } else {
    ID = url;
  }
  return ID;
};

export const totalIngredient = (name, label, data) => {
  const selectLabel =
    label || label !== "" ? data.filter((item) => item.type === label) : data;

  const sum = selectLabel.reduce(
    (accumulator, currentValue) =>
      parseFloat(accumulator) + parseFloat(currentValue[name]),
    0,
  );
  return parseFloat(sum.toFixed(2));
};

export const calculatePurpose = (targetWeight, currentWeight, changeWeight) => {
  const value = Math.abs((currentWeight - targetWeight) / changeWeight);
  return value.toFixed(0);
};
export const calculateEditValue = (
  nutritionalValueOld,
  nutritionalValue,
  ingredient,
) => {
  const value =
    nutritionalValueOld < nutritionalValue
      ? (((nutritionalValue * ingredient) / nutritionalValueOld) * 1).toFixed(2)
      : ((nutritionalValue / nutritionalValueOld) * ingredient).toFixed(2);
  return value;
};
export const calculateBMR = (currentWeight) => {
  return Math.ceil(15.057 * currentWeight + 692.2);
};

export const calculatePAL = (activityDay, trainingActivity) => {
  let PAL;
  if (activityDay === "low" && trainingActivity === "low") {
    PAL = 1.55;
  } else if (
    (activityDay === "medium" && trainingActivity === "low") ||
    (activityDay === "low" && trainingActivity === "medium")
  ) {
    PAL = 1.6;
  } else if (
    (activityDay === "high" && trainingActivity === "low") ||
    (activityDay === "low" && trainingActivity === "high")
  ) {
    PAL = 2;
  } else if (activityDay === "medium" && trainingActivity === "medium") {
    PAL = 1.8;
  } else if (
    (activityDay === "medium" && trainingActivity === "high") ||
    (activityDay === "high" && trainingActivity === "medium")
  ) {
    PAL = 2.1;
  } else if (activityDay === "high" && trainingActivity === "high") {
    PAL = 2.2;
  } else {
    PAL = 1.55;
  }
  return PAL;
};

export const calculateDeficiency = (value, currentWeight, targetWeight) => {
  if (targetWeight < currentWeight) {
    return -value * 1000;
  }
  return value * 1000;
};

export const calculateCaloric = (bmr, pal, deficit) => {
  return bmr * pal - deficit;
};

export const calculateNutritionalValues = (caloric) => {
  const nutritional = {
    proteins: ((caloric * 0.15) / 4).toFixed(2),
    fats: ((caloric * 0.3) / 9).toFixed(2),
    carbs: ((caloric * 0.55) / 4).toFixed(2),
  };
  return nutritional;
};
