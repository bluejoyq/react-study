import { useState } from "react";
import { IssueModel, KanbanColumnModel } from "../models/Kanban";
import { KanbanIssue } from "./KanbanIssue";
import { useModalContext } from "../hooks/useModalContext";

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
  const { issues, id, name } = kanbanColumn;

  const [isDragIn, setIsDragIn] = useState(false);
  const { openModal, closeModal } = useModalContext();
  const handleDragDrop = (e: React.DragEvent) => {
    const issue = JSON.parse(e.dataTransfer.getData("issue"));
    moveIssue(issue, kanbanColumn.id);
    setIsDragIn(false);
  };
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

  const handleDragEnter = () => {
    setIsDragIn(true);
  };
  const handleDragLeave = () => {
    setIsDragIn(false);
  };
  return (
    <section
      key={id}
      className="flex flex-col border-black border-2 w-48 overflow-y-auto gap-2 p-2 flex-shrink-0"
      onDrop={handleDragDrop}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      <header className="flex justify-between">
        <h2 className="m-0">{name}</h2>
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
      {isDragIn && (
        <div className="border-2 border-dashed h-28 pointer-events-none" />
      )}
    </section>
  );
};
