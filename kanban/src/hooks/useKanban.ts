import { IssueModel, KanbanModel, KanbanColumnModel } from "../models/Kanban";
import { useSavedState } from "./useSavedState";

export const useKanban = (initialColumnNames: string[]) => {
  const _initState = () =>
    initialColumnNames.reduce(
      (acc, name, idx) => {
        const id = `${idx}`;
        acc[id] = {
          id,
          name: name,
          issues: [],
        };
        return acc;
      },
      {} as Record<string, KanbanColumnModel>,
    );
  const [kanban, setKanban] = useSavedState<KanbanModel>("kanban", {
    columns: _initState(),
  });

  const addIssue = (title: string, description: string) => {
    setKanban((prev) => {
      const targetId = Object.keys(prev.columns)[0];
      const newIssue: IssueModel = {
        id: `${Date.now()}`,
        title,
        description,
        columnId: targetId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const targetColumn = prev.columns[targetId];
      const newColumns = {
        ...prev.columns,
        [targetId]: {
          ...targetColumn,
          issues: [...targetColumn.issues, newIssue],
        },
      };
      return {
        columns: newColumns,
      };
    });
  };

  const removeIssue = (issue: IssueModel) => {
    setKanban((prev) => {
      const targetColumn = prev.columns[issue.columnId];
      const newColumns = {
        ...prev.columns,
        [issue.columnId]: {
          ...targetColumn,
          issues: targetColumn.issues.filter((i) => i.id !== issue.id),
        },
      };
      return {
        columns: newColumns,
      };
    });
  };

  const updateIssue = (updatedIssue: IssueModel) => {
    const targetColumn = kanban.columns[updatedIssue.columnId];
    const newColumns = {
      ...kanban.columns,
      [updatedIssue.columnId]: {
        ...targetColumn,
        issues: targetColumn.issues.map((i) =>
          i.id === updatedIssue.id
            ? {
                ...updatedIssue,
                updatedAt: new Date(),
              }
            : i,
        ),
      },
    };

    setKanban({ columns: newColumns });
  };

  const moveIssue = (issue: IssueModel, columnId: string) => {
    if (issue.columnId === columnId) {
      return;
    }
    removeIssue(issue);
    const movingIssue = {
      ...issue,
      columnId,
      updatedAt: new Date(),
    };
    setKanban((prev) => {
      const targetColumn = prev.columns[columnId];
      const newColumns = {
        ...prev.columns,
        [columnId]: {
          ...targetColumn,
          issues: [...targetColumn.issues, movingIssue],
        },
      };
      return {
        columns: newColumns,
      };
    });
  };

  const addColumn = (column: KanbanColumnModel) => {
    if (kanban.columns[column.id]) {
      throw new Error("이미 존재하는 칼럼입니다.");
    }
    const newColumns = {
      ...kanban.columns,
      [column.id]: column,
    };
    setKanban({ columns: newColumns });
  };

  const removeColumn = (columnId: string) => {
    if (!kanban.columns[columnId]) {
      throw new Error("존재하지 않는 칼럼입니다.");
    }

    if (Object.keys(kanban.columns).length === 1) {
      throw new Error("칼럼은 최소 1개 이상이어야 합니다.");
    }
    const targetColumn = kanban.columns[columnId];
    if (targetColumn.issues.length) {
      throw new Error("칼럼에 이슈가 남아있습니다.");
    }
    const newColumns = {
      ...kanban.columns,
    };
    delete newColumns[columnId];
    setKanban({ columns: newColumns });
  };

  const renameColumn = (columnId: string, name: string) => {
    const targetColumn = kanban.columns[columnId];
    const newColumns = {
      ...kanban.columns,
      [columnId]: {
        ...targetColumn,
        name,
      },
    };
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
    renameColumn,
  };
};
