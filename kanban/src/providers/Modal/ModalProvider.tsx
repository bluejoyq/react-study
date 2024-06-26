import { PropsWithChildren, ReactNode, useState } from "react";
import { ModalContext } from "./ModalContext";

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
      {modals.length > 0 && (
        <div className="modal">{modals[modals.length - 1]}</div>
      )}
      {children}
    </ModalContext.Provider>
  );
};
