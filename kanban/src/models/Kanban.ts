export interface IssueModel<IssueStatus extends string = string> {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  status: IssueStatus;
}
export interface Kanban<IssueStatus extends string = string> {
  columns: Record<IssueStatus, IssueModel<IssueStatus>[]>;
}
