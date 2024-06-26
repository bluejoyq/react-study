import { ReactNode, createContext, useContext } from "react";

interface ModalContext {
  openModal: (modal: ReactNode) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContext>({
  openModal: () => {},
  closeModal: () => {},
});

export const useModal = () => {
  return useContext(ModalContext);
};
