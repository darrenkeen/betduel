import { createContext, useState } from 'react';

export const ModalContext = createContext();

export function ModalContextProvider({ children }) {
  const [showModal, setShowModal] = useState(false);

  function onSetShowModal(val) {
    setShowModal(val);
  }

  return (
    <ModalContext.Provider
      value={{
        showModal,
        onSetShowModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
