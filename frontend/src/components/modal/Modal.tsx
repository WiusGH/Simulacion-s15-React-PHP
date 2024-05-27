import React from "react";
import { GrClose } from "react-icons/gr";
import Login from "../login/Login";
import style from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={style.overlay}>
      <div className={style.card}>
        <div
          className={style.close}
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
