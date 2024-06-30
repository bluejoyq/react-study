import { handleError } from "../utils/error";

interface FallbackProps {
  error: unknown;
  resetErrorBoundary: () => void;
}
export function Fallback({
  error: rawError,
  resetErrorBoundary,
}: FallbackProps) {
  const error = handleError(rawError);
  return (
    <div>
      <h1>오류가 발생했습니다.</h1>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>다시 시도</button>
    </div>
  );
}
