import { useModalContext } from "../hooks/useModal";
import { IssueModel } from "../models/Kanban";

interface RemoveModalProps {
  closeModal: () => void;
  removeIssue: () => void;
}
const RemoveModal = ({ closeModal, removeIssue }: RemoveModalProps) => {
  return (
    <div className="modal-box">
      <h2>이슈 삭제</h2>
      <p>이슈를 삭제하시겠습니까?</p>
      <div className="flex gap-2">
        <button className="btn" onClick={removeIssue}>
          삭제
        </button>
        <button className="btn" onClick={closeModal}>
          취소
        </button>
      </div>
    </div>
  );
};

export const KanbanIssue = ({
  issue,
  removeIssue,
}: {
  issue: IssueModel;
  removeIssue: (issue: IssueModel) => void;
}) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("issue", JSON.stringify(issue));
  };
  const handleRemoveIssue = () => {
    removeIssue(issue);
    closeModal();
  };
  const handleOpenRemoveModal = () => {
    openModal(
      <RemoveModal closeModal={closeModal} removeIssue={handleRemoveIssue} />,
    );
  };

  const { openModal, closeModal } = useModalContext();
  return (
    <div
      draggable
      className="border-black border-2 p-1"
      onDragStart={handleDragStart}
    >
      <h3 className="m-0">{issue.title}</h3>
      <p className="m-0">{issue.description}</p>
      <div className="flex gap-2">
        <button className="btn">수정</button>
        <button className="btn" onClick={handleOpenRemoveModal}>
          삭제
        </button>
      </div>
    </div>
  );
};
