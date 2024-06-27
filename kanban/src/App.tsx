import { ModalProvider } from "./providers/Modal";
import { Header } from "./components/Header";
import { useKanban } from "./hooks/useKanban";
import { KanbanColumn } from "./components/KanbanColumn";

function App() {
  const {
    kanban,
    addIssue,
    addColumn,
    moveIssue,
    removeIssue,
    renameColumn,
    removeColumn,
  } = useKanban(["a", "b", "c"]);
  const columns = kanban.columns;
  const columnIds = Object.keys(columns);

  return (
    <ModalProvider>
      <Header addColumn={addColumn} addIssue={addIssue} />
      <main className="prose flex flex-row gap-2">
        {columnIds.map((columnStatus) => {
          const kanbanColumn = columns[columnStatus] ?? [];
          return (
            <KanbanColumn
              key={columnStatus}
              kanbanColumn={kanbanColumn}
              moveIssue={moveIssue}
              removeIssue={removeIssue}
              renameColumn={renameColumn}
              removeColumn={removeColumn}
            />
          );
        })}
      </main>
    </ModalProvider>
  );
}

export default App;
