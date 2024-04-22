import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { UserAuth } from "../../context/AuthContext";
import { UseProjectContext } from "../../context/ProjectContext";
import { useEffect, useState } from "react";

const AccordionItem = ({ item, onDelete, onEditItem }) => {
  const { userDetail, user } = UserAuth();

  const handleClickItem = (id) => {
    onEditItem(id);
  };

  const handleClickDelete = (id) => {
    onDelete(id, user.uid, userDetail);
  };

  return (
    <table
      className={`text-left text-sm font-light rounded-sm  bg-gray-200 border border-solid border-slate-50 hover:bg-gray-100 `}
    >
      <thead className="	 font-medium text-white ">
        <tr className="py-4 text-stone-700 ">
          <th className="px-6 py-2 min-w-44">{item.name}</th>
          <th className="px-4">Białko</th>
          <th className="px-4">Tłuszcze</th>
          <th className="px-4">Węglowodany</th>
          <th className="px-4">Kalorie</th>
          <th className="px-4">Akcja</th>
        </tr>
      </thead>
      <tbody>
        <tr key={item.id}>
          <td className="text-left px-4 pb-3">Ilość:</td>
          <td className="text-left px-4 pb-3">{item.proteins}</td>
          <td className="text-left px-4 pb-3">{item.fats}</td>
          <td className="text-left px-4 pb-3">{item.carbs}</td>
          <td className="text-left px-4 pb-3">{item.energyValue}</td>
          <td className="text-left pr-2 pb-3 flex">
            <div
              className="cursor-pointer p-2"
              onClick={() => handleClickItem(item.pid)}
            >
              <FaEdit size={16} />
            </div>
            <div
              className="cursor-pointer p-2"
              onClick={() => handleClickDelete(item.pid)}
            >
              <AiFillDelete size={16} />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default AccordionItem;
