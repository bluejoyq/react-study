import { Modal } from "./components/Modal";
import { useModalContext } from "./hooks/useModalContext";

export function Page() {
  const { openModal } = useModalContext();

  const handleOpenModal = () => {
    openModal((closeModal) => (
      <Modal onClose={closeModal} open>
        <Modal.Backdrop onBackdropClick={closeModal}>
          <div className="bg-white p-4 rounded">
            <h2 className="text-xl font-bold">Modal</h2>
            <p>This is a modal</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </Modal.Backdrop>
      </Modal>
    ));
  };

  return (
    <div className="App">
      <h1>App</h1>
      <button onClick={handleOpenModal}>Open Modal</button>
    </div>
  );
}
