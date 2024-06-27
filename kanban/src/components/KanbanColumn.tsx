import { IssueModel, KanbanColumnModel } from "../models/Kanban";
import { KanbanIssue } from "./KanbanIssue";

interface KanbanColumnProps {
  kanbanColumn: KanbanColumnModel;
  moveIssue: (issue: IssueModel, status: string) => void;
  removeIssue: (issue: IssueModel) => void;
}

export const KanbanColumn = ({
  kanbanColumn,
  moveIssue,
  removeIssue,
}: KanbanColumnProps) => {
  const handleDragDrop = (e: React.DragEvent, dropedStatus: string) => {
    const issue = JSON.parse(e.dataTransfer.getData("issue"));
    moveIssue(issue, dropedStatus);
  };
  const { issues, id, name } = kanbanColumn;
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
      <h2 className="h2">{name}</h2>
      {issues.map((issue) => (
        <KanbanIssue key={issue.id} issue={issue} removeIssue={removeIssue} />
      ))}
    </section>
  );
};
