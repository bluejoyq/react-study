import { PropsWithChildren, ReactNode, useState } from "react";
import { ModalContext } from "./ModalContext";
import { createPortal } from "react-dom";

export const ModalProvider = ({ children }: PropsWithChildren) => {
  const [modals, setModals] = useState<ReactNode[]>([]);
  console.log(modals);
  const openModal = (modal: ReactNode) => setModals([...modals, modal]);
  const closeModal = () => setModals(modals.slice(0, -1));
  return (
    <ModalContext.Provider
      value={{
        openModal,
        closeModal,
      }}
    >
      {children}
      {createPortal(
        modals.map((modal, idx) => (
          <div
            key={idx}
            className="modal opacity-100 pointer-events-auto"
            onClick={closeModal}
          >
            {modal}
          </div>
        )),
        document.body,
      )}
    </ModalContext.Provider>
  );
};
