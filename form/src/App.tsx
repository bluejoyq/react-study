import { Page } from "./Page";
import { GlobalProvider } from "./providers/GlobalProvider";

function App() {
  return (
    <GlobalProvider>
      <Page />
    </GlobalProvider>
  );
}

export default App;
