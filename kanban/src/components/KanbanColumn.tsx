import { useState } from "react";
import { IssueModel, KanbanColumnModel } from "../models/Kanban";
import { KanbanIssue } from "./KanbanIssue";
import { useModalContext } from "../hooks/useModal";

interface KanbanRenameModalProps {
  closeModal: () => void;
  renameColumn: (id: string, name: string) => void;

  kanbanColumn: KanbanColumnModel;
}
const KanbanRenameModal = ({
  closeModal,
  renameColumn,
  kanbanColumn,
}: KanbanRenameModalProps) => {
  const [name, setName] = useState(kanbanColumn.name);
  const handleRename = () => {
    renameColumn(kanbanColumn.id, name);
    closeModal();
  };
  return (
    <div className="modal-box">
      <h2 className="h2">Rename Column</h2>
      <input
        type="text"
        className="input input-bordered"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <div>
        <button onClick={closeModal} className="btn">
          취소
        </button>
        <button onClick={handleRename} className="btn">
          변경
        </button>
      </div>
    </div>
  );
};

interface KanbanRemoveModalProps {
  closeModal: () => void;
  removeColumn: (id: string) => void;
  kanbanColumn: KanbanColumnModel;
}

const KanbanRemoveModal = ({
  closeModal,
  removeColumn,
  kanbanColumn,
}: KanbanRemoveModalProps) => {
  const handleRemove = () => {
    removeColumn(kanbanColumn.id);
    closeModal();
  };
  return (
    <div className="modal-box">
      <h2 className="h2">Remove Column</h2>
      <p>Are you sure you want to remove this column?</p>
      <div>
        <button onClick={closeModal} className="btn">
          취소
        </button>
        <button onClick={handleRemove} className="btn">
          삭제
        </button>
      </div>
    </div>
  );
};

interface KanbanColumnProps {
  kanbanColumn: KanbanColumnModel;
  moveIssue: (issue: IssueModel, status: string) => void;
  removeIssue: (issue: IssueModel) => void;
  renameColumn: (id: string, name: string) => void;
  removeColumn: (id: string) => void;
}

export const KanbanColumn = ({
  kanbanColumn,
  moveIssue,
  removeIssue,
  renameColumn,
  removeColumn,
}: KanbanColumnProps) => {
  const handleDragDrop = (e: React.DragEvent, dropedStatus: string) => {
    const issue = JSON.parse(e.dataTransfer.getData("issue"));
    moveIssue(issue, dropedStatus);
  };
  const { issues, id, name } = kanbanColumn;
  const { openModal, closeModal } = useModalContext();
  const handleOpenRenameModal = () => {
    openModal(
      <KanbanRenameModal
        closeModal={closeModal}
        renameColumn={renameColumn}
        kanbanColumn={kanbanColumn}
      />,
    );
  };
  const handleOpenRemoveModal = () => {
    openModal(
      <KanbanRemoveModal
        closeModal={closeModal}
        removeColumn={removeColumn}
        kanbanColumn={kanbanColumn}
      />,
    );
  };
  return (
    <section
      key={id}
      className="flex-1 border-black border-2"
      onDrop={(e) => {
        handleDragDrop(e, id);
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
    >
      <header className="flex justify-between">
        <h2 className="h2">{name}</h2>
        <div>
          <button onClick={handleOpenRenameModal} className="btn">
            수정
          </button>
          <button onClick={handleOpenRemoveModal} className="btn">
            삭제
          </button>
        </div>
      </header>
      {issues.map((issue) => (
        <KanbanIssue key={issue.id} issue={issue} removeIssue={removeIssue} />
      ))}
    </section>
  );
};
