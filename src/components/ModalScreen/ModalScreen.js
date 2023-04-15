// components/Modal/Modal.js
import React from 'react';
import './ModalScreen.module.scss';

const Modal = ({ isOpen, onClose, title, buttons, children }) => {
  if (!isOpen) return null;

  return (
    <div className="ModalBackdrop" onClick={onClose}>
      <div className="ModalContent" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <div className="ModalBody">{children}</div>
        <div className="ModalButtons">{buttons}</div>
      </div>
    </div>
  );
};

export default Modal;
