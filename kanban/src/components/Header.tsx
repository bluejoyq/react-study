import { useState } from "react";
import { useModalContext } from "../hooks/useModal";
import { IssueModel } from "../models/Kanban";

interface AddIssueModalProps {
  closeModal: () => void;
  addIssue: (issue: IssueModel) => void;
}

const AddIssueModal = ({ closeModal, addIssue }: AddIssueModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddIssue = () => {
    if (!title || !description) return alert("제목과 설명을 입력해주세요.");
    addIssue({
      id: `${Date.now()}`,
      title: title,
      description: description,
      createdAt: new Date(),
      updatedAt: new Date(),
      columnId: "a",
    });
    closeModal();
  };
  return (
    <div className="modal-box flex flex-col gap-2 prose">
      <h2>이슈 추가</h2>
      <input
        type="text"
        className="input input-bordered w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="textarea textarea-bordered w-full"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <p>이슈를 추가하시겠습니까?</p>
      <div className="flex gap-2">
        <button className="btn" onClick={handleAddIssue}>
          추가
        </button>
        <button className="btn" onClick={closeModal}>
          취소
        </button>
      </div>
    </div>
  );
};

interface HeaderProps {
  addIssue: (issue: IssueModel) => void;
  addColumn: (status: string) => void;
}
export const Header = ({ addIssue, addColumn }: HeaderProps) => {
  const { openModal, closeModal } = useModalContext();
  const handleOpenAddIssueModal = () => {
    openModal(<AddIssueModal closeModal={closeModal} addIssue={addIssue} />);
  };

  const handleAddColumn = () => {
    addColumn("d");
  };
  return (
    <header className="prose flex gap-2">
      <h1>칸반 보드</h1>
      <button className="btn" onClick={handleOpenAddIssueModal}>
        이슈 추가
      </button>
      <button className="btn" onClick={handleAddColumn}>
        칼럼 추가
      </button>
    </header>
  );
};
