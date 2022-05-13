import { createContext, useState } from 'react';

export const ModalContext = createContext();

export function ModalContextProvider({ children }) {
  const [modalContent, setModalContent] = useState();

  function onSetModalContent(val) {
    setModalContent(val);
  }

  return (
    <ModalContext.Provider value={{ modalContent, onSetModalContent }}>
      {children}
    </ModalContext.Provider>
  );
}
