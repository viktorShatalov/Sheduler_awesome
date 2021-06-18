import React from 'react';
import Modal from 'components/UI/Modal';
import st from './modalInfo.module.scss';

const ModalInfo = ({ title = '', text = '', closeText = 'Close', toOpen = false, onClose }) => {

  return (
    <Modal
      isOpen={!!toOpen}
      onClose={onClose}
    >
      {title && (
        <div className={st.header}>{title}</div>
      )}
      
      {text && (
        <div className={st.content}>{text}</div>
      )}

      <div className={st.footer}>
        <button
          className="esq-bold esq-warning"
          onClick={onClose}
        >{closeText}</button>
      </div>
    </Modal>
  );
};

export default ModalInfo;