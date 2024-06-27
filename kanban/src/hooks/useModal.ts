import { useContext } from "react";
import { ModalContext } from "../providers/Modal";

export const useModalContext = () => {
  return useContext(ModalContext);
};
