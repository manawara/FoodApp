import example from "../assets/example.jpg";
import { CgTime } from "react-icons/cg";

const Box = ({ onModal, data, onClickItem }) => (
  <div
    className="shadow-md bg-gray-50 rounded-md cursor-pointer hover:scale-110 transition scale duration-300 max-w-[280px]"
    onClick={() => {
      onModal();
      onClickItem(data);
    }}
  >
    <img
      src={`${data.imageFile !== "" ? "https://firebasestorage.googleapis.com/v0/b/befit-51c7f.appspot.com/o/images%2F" + data.imageFile + "?alt=media" : example}`}
      className=""
    />
    <h3 className="text-left my-2 px-4 ">{data.name}</h3>
    <div className="flex justify-between items-center py-2  px-4  w-full shadow-md">
      <span>{data.energyValue} kcal</span>
      <div className="flex items-center">
        <CgTime />
        <span className="ml-2">{data.timeDuration} min</span>
      </div>
    </div>
  </div>
);

export default Box;
