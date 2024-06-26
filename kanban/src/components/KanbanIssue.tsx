import { IssueModel } from "../models/Kanban";

export const KanbanIssue = <IssueStatus extends string>({
  issue,
  removeIssue,
}: {
  issue: IssueModel<IssueStatus>;
  removeIssue: (issue: IssueModel<IssueStatus>) => void;
}) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("issue", JSON.stringify(issue));
  };
  const handleRemoveIssue = () => {
    removeIssue(issue);
  };
  return (
    <div
      draggable
      className="border-black border-2"
      onDragStart={handleDragStart}
    >
      <h3>{issue.title}</h3>
      <p>{issue.description}</p>
      <div className="flex gap-2">
        <button className="btn">수정</button>
        <button className="btn" onClick={handleRemoveIssue}>
          삭제
        </button>
      </div>
    </div>
  );
};
