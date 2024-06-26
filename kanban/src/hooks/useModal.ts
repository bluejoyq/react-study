import { useContext } from "react";
import { ModalContext } from "../providers/Modal";

export const useModal = () => {
  return useContext(ModalContext);
};
