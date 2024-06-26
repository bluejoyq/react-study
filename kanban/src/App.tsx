import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

interface IssueModel<IssueStatus extends string = string> {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  status: IssueStatus;
}
interface Kanban<IssueStatus extends string = string> {
  columns: Record<IssueStatus, IssueModel<IssueStatus>[]>;
}

const useSavedState = <T,>(
  key: string,
  defaultValue: T,
): [T, Dispatch<SetStateAction<T>>] => {
  const _saveState = useCallback(
    (value: T) => {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [key],
  );
  const [state, setState] = useState<T>(() => {
    const savedState = localStorage.getItem(key);
    if (savedState) {
      return JSON.parse(savedState);
    }
    return defaultValue;
  });

  const setSavedState = (stateAction: SetStateAction<T>) => {
    setState((prevState) => {
      const newState =
        typeof stateAction === "function"
          ? (stateAction as (prevState: T) => T)(prevState)
          : stateAction;
      _saveState(newState);
      return newState;
    });
  };

  useEffect(() => {
    _saveState(state);
  }, [state, _saveState]);
  return [state, setSavedState];
};

const useKanban = <IssueStatus extends string = string>(
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

const Issue = <IssueStatus extends string>({
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

function App() {
  const { kanban, addIssue, addColumn, moveIssue, removeIssue } =
    useKanban<string>(["a", "b", "c"]);
  const columns = kanban.columns;
  const columnKeys = Object.keys(columns);

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

  const handleDragDrop = (e: React.DragEvent, dropedStatus: string) => {
    const issue = JSON.parse(e.dataTransfer.getData("issue"));
    moveIssue(issue, dropedStatus);
  };

  return (
    <>
      <header className="prose flex gap-2">
        <h1>칸반 보드</h1>
        <button className="btn" onClick={handleAddIssue}>
          이슈 추가
        </button>
        <button className="btn" onClick={handleAddColumn}>
          칼럼 추가
        </button>
      </header>
      <main className="prose flex flex-row">
        {columnKeys.map((columnKey) => {
          const issues = columns[columnKey] ?? [];
          return (
            <section
              key={columnKey}
              className="flex-1"
              onDrop={(e) => {
                handleDragDrop(e, columnKey);
              }}
              onDragOver={(e) => {
                e.preventDefault();
              }}
            >
              <h2 className="h2">{columnKey}</h2>
              <ul>
                {issues.map((issue) => (
                  <Issue
                    key={issue.id}
                    issue={issue}
                    removeIssue={removeIssue}
                  />
                ))}
              </ul>
            </section>
          );
        })}
      </main>
    </>
  );
}

export default App;
