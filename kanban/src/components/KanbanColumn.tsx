import { IssueModel } from "../models/Kanban";
import { KanbanIssue } from "./KanbanIssue";

interface KanbanColumnProps {
  issues: IssueModel[];
  status: string;
  moveIssue: (issue: IssueModel, status: string) => void;
  removeIssue: (issue: IssueModel) => void;
}

export const KanbanColumn = ({
  issues,
  status,
  moveIssue,
  removeIssue,
}: KanbanColumnProps) => {
  const handleDragDrop = (e: React.DragEvent, dropedStatus: string) => {
    const issue = JSON.parse(e.dataTransfer.getData("issue"));
    moveIssue(issue, dropedStatus);
  };
  return (
    <section
      key={status}
      className="flex-1 border-black border-2"
      onDrop={(e) => {
        handleDragDrop(e, status);
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
    >
      <h2 className="h2">{status}</h2>
      {issues.map((issue) => (
        <KanbanIssue key={issue.id} issue={issue} removeIssue={removeIssue} />
      ))}
    </section>
  );
};
