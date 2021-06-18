import React from 'react';
import Modal from 'components/UI/Modal';
import st from './modalConfirm.module.scss';

const ModalConfirm = ({ title = '', text = '', confirmText = 'Confirm', closeText = 'Close', toOpen = false, onClose, onConfirm }) => {

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

        <button
          className="esq-btn--outline esq-btn"
          onClick={onConfirm}
        >{confirmText}</button>
      </div>
    </Modal>
  );
};

export default ModalConfirm;