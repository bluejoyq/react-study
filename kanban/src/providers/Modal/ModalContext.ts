import { ReactNode, createContext } from "react";

interface ModalContextProps {
  openModal: (modal: ReactNode) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextProps>({
  openModal: () => {},
  closeModal: () => {},
});
