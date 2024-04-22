import { UserAuth } from "../context/AuthContext.jsx";
import { UseProjectContext } from "../context/ProjectContext.jsx";
import { getFormattedDate } from "../helpers/helpers.js";
import { useCallback, useEffect, useState } from "react";
import { CgCheckO } from "react-icons/cg";

const TableProduct = ({
  items,
  isLoading,
  isSelect,
  isRecipe,
  isSelectDate,
  onShow,
  onSelectRecipe,
}) => {
  const { user } = UserAuth();
  const { addUserProduct, meal } = UseProjectContext();
  const [isAdd, setIsAdd] = useState(false);

  const handleClickProduct = useCallback((data, meal) => {
    if (isSelect && isSelectDate) {
      const formatDate = getFormattedDate(isSelectDate);
      addUserProduct({ ...data }, user.uid, formatDate, meal);
      onShow(false);
      setIsAdd(true);
    } else if (isRecipe) {
      onSelectRecipe(data);
      setIsAdd(true);
    } else {
      return;
    }
  }, []);

  useEffect(() => {
    let time = setTimeout(() => {
      setIsAdd(false);
    }, 2000);

    return () => {
      clearTimeout(time);
    };
  }, [isAdd]);

  return (
    <>
      <div className="overflow-auto  py-2 ">
        {isAdd && (
          <div className="relative ">
            <div className="fixed  right-0 p-8 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 border border-solid border-black">
              <div className="flex justify-center align-center items-center">
                <span className="pr-2">Produkt został dodany</span>
                <CgCheckO size={25} color="green" />
              </div>
            </div>
          </div>
        )}
        <table className="min-w-full text-left text-sm font-light rounded-sm ">
          <thead className="border-b bg-gray-200	 font-medium text-white ">
            <tr className="py-4 text-stone-700 ">
              <th className="px-6 py-4 min-w-40">Nazwa produktu</th>
              <th className="px-4">Rodzaj</th>
              <th className="px-4">Białko</th>
              <th className="px-4">Tłuszcze</th>
              <th className="px-4">Węglowodany</th>
              <th className="px-4">Kalorie</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td>Laduje dane</td>
              </tr>
            ) : null}
            {items &&
              items.map((item, index) => (
                <tr
                  key={item.id}
                  className={`${index % 2 === 0 ? "odd:bg-white" : ""} hover:bg-gray-100 cursor-pointer`}
                  onClick={() => handleClickProduct(item, meal)}
                >
                  <td className="text-left px-6 py-3">{item.name}</td>
                  <td className="text-left px-4 py-3">{item.type}</td>
                  <td className="text-left px-4 py-3">{item.proteins}</td>
                  <td className="text-left px-4 py-3">{item.fats}</td>
                  <td className="text-left px-4 py-3">{item.carbs}</td>
                  <td className="text-left px-4 py-3">{item.energyValue}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default TableProduct;
