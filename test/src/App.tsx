import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./pages/home/Home";
import BetterHomePage from "./pages/home/BetterHome";
import { ErrorBoundary } from "react-error-boundary";
import { useState } from "react";

const queryClient = new QueryClient();
function App() {
  const [checked, setChecked] = useState(false);
  return (
    <QueryClientProvider client={queryClient}>
      <span>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          id="deferredValue"
        />
        <label htmlFor="deferredValue">deferredValue 사용</label>
      </span>

      <ErrorBoundary
        fallbackRender={({ error }) => {
          console.warn(error); // 로그 수집
          return <div>에러가 발생했습니다.</div>;
        }}
      >
        {checked ? <BetterHomePage /> : <HomePage />}
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
