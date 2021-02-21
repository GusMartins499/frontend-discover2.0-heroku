import React from 'react';

import './styles.css';

function Modal({ isOpen, titleModal, children }) {

  return (
    <>
      {isOpen ? (
        <div className="modal-overlay active">
          <div className="modal">
            <div id="form">
              <h2>{titleModal}</h2>
              {children}
            </div>
          </div>
        </div>
      ) : (
          null
        )}
    </>
  )
}

export default Modal;