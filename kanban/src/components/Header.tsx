import { IssueModel } from "../models/Kanban";

interface HeaderProps {
  addIssue: (issue: IssueModel) => void;
  addColumn: (status: string) => void;
}
export const Header = ({ addIssue, addColumn }: HeaderProps) => {
  const handleAddIssue = () => {
    addIssue({
      id: "1",
      title: "Title",
      description: "Description",
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "a",
    });
  };

  const handleAddColumn = () => {
    addColumn("d");
  };
  return (
    <header className="prose flex gap-2">
      <h1>칸반 보드</h1>
      <button className="btn" onClick={handleAddIssue}>
        이슈 추가
      </button>
      <button className="btn" onClick={handleAddColumn}>
        칼럼 추가
      </button>
    </header>
  );
};
