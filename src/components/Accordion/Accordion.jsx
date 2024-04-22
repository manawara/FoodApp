import { useState } from "react";
import AccordionItem from "./AccordionItem.jsx";
import { FaPlus } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import Modal from "../Modal.jsx";
import Product from "../page/Product/Product.jsx";

const Accordion = ({
  label,
  name,
  selectDate,
  data,
  total,
  onShowPopup,
  isShowPopup,
  onDelete,
  onEditItem,
}) => {
  const [show, setShow] = useState(false);

  const handleClickAccordion = () => {
    setShow((prevState) => !prevState);
  };

  return (
    <>
      <div className="max-w-lg mb-4">
        <table className="text-left text-sm font-light rounded-sm bg-gray-400 w-44">
          <thead className=" font-medium text-white ">
            <tr className="text-stone-700 px-4 ">
              <th className="px-6 min-w-44 pt-4">{label} </th>
              <th className="px-4 pt-4">Białko</th>
              <th className="px-4 pt-4">Tłuszcze</th>
              <th className="px-4 pt-4">Węglowodany</th>
              <th className="px-4 pt-4 min-w-[83px]">Kalorie</th>
              <th className="px-4 pt-4">Akcja</th>
            </tr>
          </thead>
          <tbody>
            <tr className="max-w-44">
              <td className="text-center px-4 pb-4">Suma:</td>
              <td className="text-center px-4 pb-4 ">
                {total ? total.totalProteinsDay : 0}
              </td>
              <td className="text-center px-4 pb-4">
                {total ? total.totalFatsDay : 0}
              </td>
              <td className="text-center px-4 pb-4">
                {total ? total.totalCarbsDay : 0}
              </td>
              <td className="text-center px-4 pb-4">
                {total ? total.totalEnergyValueDay : 0}
              </td>
              <td className="flex">
                <div
                  className="self-center cursor-pointer"
                  onClick={() => onShowPopup(name)}
                >
                  <FaPlus size={25} />{" "}
                </div>
                <div
                  className="pl-2 cursor-pointer"
                  onClick={() => handleClickAccordion(name)}
                >
                  <IoIosArrowDown size={25} />
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {show &&
          data
            .filter((item) => item.type === name)
            .map((item) => (
              <AccordionItem
                key={item.pid}
                item={item}
                onDelete={onDelete}
                onEditItem={onEditItem}
              />
            ))}
      </div>
      {isShowPopup && (
        <Modal open onCloseModal={onShowPopup} size="28" large>
          <Product onSelect selectDate={selectDate} onShow={setShow} />
        </Modal>
      )}
    </>
  );
};

export default Accordion;
