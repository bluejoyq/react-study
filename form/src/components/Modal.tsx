import { PropsWithChildren, createContext, useContext, useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalLocalContextValue {
  onClose: () => void;
}
const ModalLocalContext = createContext<ModalLocalContextValue | null>(null);

const useModalLocalContext = () => {
  const context = useContext(ModalLocalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};

interface ModalProps {
  onClose: () => void;
  open: boolean;
}
function Modal({ children, onClose, open }: PropsWithChildren<ModalProps>) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  if (!open) {
    return null;
  }
  return createPortal(
    <ModalLocalContext.Provider value={{ onClose }}>
      {children}
    </ModalLocalContext.Provider>,
    document.body,
  );
}

interface BackdropProps {
  onBackdropClick: () => void;
}
function Backdrop({
  children,
  onBackdropClick,
}: PropsWithChildren<BackdropProps>) {
  return (
    <div
      className="w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-70 flex justify-center items-center"
      onClick={onBackdropClick}
    >
      <div onClick={(event) => event.stopPropagation()}>{children}</div>
    </div>
  );
}

interface HeaderProps {
  onClose?: () => void;
}

function Header({ children, onClose }: PropsWithChildren<HeaderProps>) {
  const { onClose: closeModal } = useModalLocalContext();
  const handleClose = onClose ?? closeModal;
  return (
    <div className="flex justify-between items-center relative">
      {children}
      <button onClick={handleClose} className="absolute right-2">
        X
      </button>
    </div>
  );
}

Modal.Backdrop = Backdrop;
Modal.Header = Header;

export { Modal };
