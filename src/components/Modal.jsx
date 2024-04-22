import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { CgClose } from "react-icons/cg";

function Modal({ open, children, onClose, onCloseModal, large, isPadding }) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);
  let classes = large ? `w-full sm:max-w-[700px]` : "max-w-sm  w-full";

  return createPortal(
    <dialog
      className={`${classes} backdrop:backdrop-blur-sm  ${!isPadding ? "px-6 py-4" : "p-0"}`}
      ref={dialog}
      onClose={onClose}
    >
      <div className="relative">
        <div className="absolute end-0 p-2 cursor-pointer ">
          <CgClose
            onClick={onCloseModal}
            className="hover:scale-125 transition duration-300"
            size={22}
          />
        </div>
        {open ? children : null}
      </div>
    </dialog>,
    document.getElementById("modal"),
  );
}

export default Modal;
