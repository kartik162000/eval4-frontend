/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
import React from 'react';
import './Modal.css';

function Modal({
  showModal, closeModal, children,
}) {
  return (
    <div className={`modal ${showModal ? 'show' : ''}`}>
      <div className="modal-content">
        {children}
        <button onClick={closeModal}>Close Modal</button>
      </div>
    </div>
  );
}

export default Modal;
