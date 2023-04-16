// components/Modal/Modal.js
import React from 'react';
import styles from './ModalScreen.module.scss';

const Modal = ({ isOpen, onClose, title, buttons, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.ModalBackdrop} onClick={onClose}>
      <div className={styles.ModalContent} onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <div className={styles.ModalBody}>{children}</div>
        <div className={styles.ModalButtons}>{buttons}</div>
      </div>
    </div>
  );
};

export default Modal;
