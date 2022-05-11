import { useContext } from 'react';
import ReactModal from 'react-modal';
import { ModalContext } from '../../contexts/ModalContext';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

ReactModal.setAppElement('#root');

export function Modal() {
  const { showModal, onSetShowModal } = useContext(ModalContext);
  return (
    <ReactModal
      isOpen={showModal}
      style={customStyles}
      shouldCloseOnOverlayClick={true}
      onRequestClose={() => onSetShowModal(false)}
    >
      <div className="Modal">
        <h1>Your bet has been placed successfully</h1>
      </div>
    </ReactModal>
  );
}
