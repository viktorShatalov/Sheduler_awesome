import React from 'react';
import Popup from "reactjs-popup";

import st from './modal.module.scss';
import Icon from 'components/UI/Icon';

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <Popup
      open={isOpen}
      modal={true}
      lockScroll={true}
      closeOnDocumentClick
      onClose={onClose}
      contentStyle={{
        background: '#FFFFFF',
        boxShadow: '0px 5px 12px rgba(0, 0, 0, 0.05)',
        borderRadius: window.innerWidth > 600 && '20px',
        border: 'none',
        width: window.innerWidth <= 600 && '100vw',
        height: window.innerWidth <= 600 && '100vh',
        maxHeight: '100vh',
        padding: 0,
        // overflow: 'auto',
        overflow: 'visible'
      }}
      overlayStyle={{
        backgroundColor: 'rgba(0,0,0,0.7)'
      }}
    >
      <div className={st.modal}>
        <button
          className={st.close}
          onClick={onClose}>
          <Icon name="close" />
        </button>
        { children }
      </div>
    </Popup>
  );
};

export default Modal;