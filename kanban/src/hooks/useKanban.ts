import { IssueModel, Kanban } from "../models/Kanban";
import { useSavedState } from "./useSavedState";

export const useKanban = <IssueStatus extends string = string>(
  initialStatus: IssueStatus[],
) => {
  const _initState = () =>
    initialStatus.reduce(
      (acc, status) => {
        acc[status] = [];
        return acc;
      },
      {} as Record<IssueStatus, IssueModel<IssueStatus>[]>,
    );
  const [kanban, setKanban] = useSavedState<Kanban<IssueStatus>>("kanban", {
    columns: _initState(),
  });

  const addIssue = (issue: IssueModel<IssueStatus>) => {
    setKanban((prev) => {
      const newColumns = {
        ...prev.columns,
        [issue.status]: [...prev.columns[issue.status], issue],
      };
      return {
        columns: newColumns,
      };
    });
  };

  const removeIssue = (issue: IssueModel<IssueStatus>) => {
    setKanban((prev) => {
      const newColumns = {
        ...prev.columns,
      };
      newColumns[issue.status] = newColumns[issue.status].filter(
        (i) => i.id !== issue.id,
      );
      return {
        columns: newColumns,
      };
    });
  };

  const updateIssue = (updatedIssue: IssueModel<IssueStatus>) => {
    const newColumns = {
      ...kanban.columns,
    };
    newColumns[updatedIssue.status] = newColumns[updatedIssue.status].map(
      (i) =>
        i.id === updatedIssue.id
          ? {
              ...updatedIssue,
              updatedAt: new Date(),
            }
          : i,
    );
    setKanban({ columns: newColumns });
  };

  const moveIssue = (issue: IssueModel<IssueStatus>, status: IssueStatus) => {
    if (issue.status === status) {
      return;
    }
    removeIssue(issue);
    addIssue({ ...issue, status, updatedAt: new Date() });
  };

  const addColumn = (newStatus: IssueStatus) => {
    if (kanban.columns[newStatus]) {
      throw new Error("이미 존재하는 칼럼입니다.");
    }
    const newColumns = {
      ...kanban.columns,
      [newStatus]: [],
    };
    setKanban({ columns: newColumns });
  };

  const removeColumn = (status: IssueStatus) => {
    if (!kanban.columns[status]) {
      throw new Error("존재하지 않는 칼럼입니다.");
    }
    if (Object.keys(kanban.columns).length === 1) {
      throw new Error("칼럼은 최소 1개 이상이어야 합니다.");
    }
    if (kanban.columns[status].length > 0) {
      throw new Error("칼럼에 이슈가 남아있습니다.");
    }
    const newColumns = {
      ...kanban.columns,
    };
    delete newColumns[status];
    setKanban({ columns: newColumns });
  };
  return {
    kanban,
    addColumn,
    removeColumn,
    addIssue,
    removeIssue,
    updateIssue,
    moveIssue,
  };
};
