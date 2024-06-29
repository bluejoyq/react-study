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
  } = useKanban(["할 일", "진행 중", "완료"]);
  const columns = kanban.columns;
  const columnIds = Object.keys(columns);

  return (
    <ModalProvider>
      <div className="h-screen w-screen flex flex-col p-5">
        <Header addColumn={addColumn} addIssue={addIssue} />
        <main className="prose flex flex-row gap-2 flex-1 overflow-auto w-full min-w-full">
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
      </div>
    </ModalProvider>
  );
}

export default App;
