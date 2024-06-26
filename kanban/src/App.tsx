import { ModalProvider } from "./providers/Modal";
import { Header } from "./components/Header";
import { useKanban } from "./hooks/useKanban";
import { KanbanColumn } from "./components/KanbanColumn";

function App() {
  const { kanban, addIssue, addColumn, moveIssue, removeIssue } =
    useKanban<string>(["a", "b", "c"]);
  const columns = kanban.columns;
  const columnStatuses = Object.keys(columns);

  return (
    <ModalProvider>
      <Header addColumn={addColumn} addIssue={addIssue} />
      <main className="prose flex flex-row gap-2">
        {columnStatuses.map((columnStatus) => {
          const issues = columns[columnStatus] ?? [];
          return (
            <KanbanColumn
              key={columnStatus}
              status={columnStatus}
              issues={issues}
              moveIssue={moveIssue}
              removeIssue={removeIssue}
            />
          );
        })}
      </main>
    </ModalProvider>
  );
}

export default App;
