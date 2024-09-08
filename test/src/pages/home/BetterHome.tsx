import { Suspense, useDeferredValue, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { isNetworkError } from "../../utils/error";
import { Content } from "./components/Content";

export default function BetterHome() {
  const [startDate, setStartDate] = useState("2024-08-01");
  const [endDate, setEndDate] = useState("2024-09-09");
  const dateRange = { startDate: startDate, endDate: endDate };
  const deferredDateRange = useDeferredValue(dateRange);
  const isDeferred = deferredDateRange !== dateRange;

  return (
    <div className="w-screen flex flex-col gap-4">
      <div className="flex gap-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <ErrorBoundary
        fallbackRender={({ error }) => {
          if (isNetworkError(error)) {
            if (error.response.status === 400) {
              return <div>Invalid date range</div>;
            }
          }
          throw error;
        }}
      >
        <Suspense fallback={"...loading"}>
          {isDeferred && <div>...loading</div>}
          <Content dateRange={deferredDateRange} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
