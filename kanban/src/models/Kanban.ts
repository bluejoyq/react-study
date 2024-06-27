export interface KanbanColumnModel {
  issues: IssueModel[];
  id: string;
  name: string;
}
export interface IssueModel {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  columnId: string;
}
export interface KanbanModel {
  columns: Record<string, KanbanColumnModel>;
}
