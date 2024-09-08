import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./pages/home";
import { ErrorBoundary } from "react-error-boundary";

const queryClient = new QueryClient();
function App() {
  return (
    <ErrorBoundary
      fallbackRender={({ error }) => {
        console.warn(error); // 로그 수집
        return <div>에러가 발생했습니다.</div>;
      }}
    >
      <QueryClientProvider client={queryClient}>
        <HomePage />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
