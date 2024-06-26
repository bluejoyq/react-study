import { PropsWithChildren, ReactNode, useState } from "react";
import { ModalContext } from "./ModalContext";
import { createPortal } from "react-dom";

const ModalContainer = ({
  children,
  closeModal,
}: PropsWithChildren<{
  closeModal: () => void;
}>) => {
  return (
    <div className="modal opacity-100 pointer-events-auto" onClick={closeModal}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const ModalProvider = ({ children }: PropsWithChildren) => {
  const [modals, setModals] = useState<ReactNode[]>([]);
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
          <ModalContainer key={idx} closeModal={closeModal}>
            {modal}
          </ModalContainer>
        )),
        document.body,
      )}
    </ModalContext.Provider>
  );
};
