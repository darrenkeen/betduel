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
  const { modalContent, onSetModalContent } = useContext(ModalContext);
  return (
    <ReactModal
      isOpen={Boolean(modalContent)}
      style={customStyles}
      shouldCloseOnOverlayClick={true}
      onRequestClose={() => onSetModalContent('')}
    >
      <div className="Modal">
        <h1>{modalContent}</h1>
      </div>
    </ReactModal>
  );
}
