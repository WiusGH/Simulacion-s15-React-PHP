import React from "react";
import { GrClose } from "react-icons/gr";
import Login from "../login/Login";
//import "./Modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-4 relative">
        <div
          className="absolute top-2 right-2 text-xl cursor-pointer"
          onClick={onClose}
          style={{ color: "black" }}
        >
          <GrClose />
        </div>
        <div>
          <Login />
        </div>
      </div>
    </div>
  );
};

export default Modal;
