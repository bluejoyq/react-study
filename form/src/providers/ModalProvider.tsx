import {
  Fragment,
  PropsWithChildren,
  ReactNode,
  createContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";

interface ModalCreator {
  (closeModal: () => void): ReactNode;
}
export interface ModalContextState {
  openModal: (modalCreator: ModalCreator) => void;
}
export const ModalContext = createContext<ModalContextState | null>(null);

function Modals({ modalMap }: { modalMap: Map<number, ReactNode> }) {
  if (modalMap.size === 0) {
    return null;
  }

  return createPortal(
    <Fragment>
      {[...modalMap.entries()].map(([id, modal]) => (
        <Fragment key={id}>{modal}</Fragment>
      ))}
    </Fragment>,
    document.body,
  );
}

export function ModalProvider({ children }: PropsWithChildren) {
  const [modalMap, setModalMap] = useState<Map<number, ReactNode>>(new Map());
  const openModal = (modalCreator: ModalCreator) => {
    const newModalMap = new Map(modalMap);
    const modalId = Date.now();
    newModalMap.set(
      modalId,
      modalCreator(() => closeModal(modalId)),
    );
    setModalMap(newModalMap);
  };
  const closeModal = (id: number) => {
    const newModalMap = new Map(modalMap);
    newModalMap.delete(id);
    setModalMap(newModalMap);
  };

  useEffect(() => {
    if (modalMap.size > 0) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalMap]);
  return (
    <ModalContext.Provider value={{ openModal }}>
      {children}
      <Modals modalMap={modalMap} />
    </ModalContext.Provider>
  );
}
