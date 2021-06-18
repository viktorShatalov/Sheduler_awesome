import React from 'react';
import Modal from 'components/UI/Modal';
import st from './modalEvents.module.scss';
import LawyerInfo from 'components/Elements/LawyerInfo';
import ListEvents from 'components/Elements/ListEvents';

const ModalEvents = ({ lawyer, events, toOpen = false, onClose, onOpenBook }) => {
  const onOpen = (e) => {
    console.log(e);
    onOpenBook(e);
  };

  return (
    <Modal
      isOpen={!!toOpen}
      onClose={onClose}
    >
      <div className={st.header}>
        <LawyerInfo lawyer={lawyer} />
      </div>

      <ListEvents
        options={{
          columns: window.innerWidth > 700 ? 4 : 2,
          toSlice: window.innerHeight > 1000 ? 9 : 6
        }}
        events={events}
        lawyer={lawyer}
        onOpenBook={onOpen}
      />

    </Modal>
  );
};

export default ModalEvents;