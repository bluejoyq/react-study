import { useContext } from "react";
import { ModalContext, ModalContextState } from "../providers/ModalProvider";

export function useModalContext(): ModalContextState {
  const modalContext = useContext(ModalContext);
  if (!modalContext) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return modalContext;
}
