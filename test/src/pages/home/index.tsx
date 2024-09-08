import { useSuspenseQuery } from "@tanstack/react-query";
import { getSalesData } from "./remotes/getSalesData";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { isNetworkError } from "../../utils/error";

export default function Home() {
  const [startDate, setStartDate] = useState("2024-09-01");
  const [endDate, setEndDate] = useState("2024-09-09");
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
          <Content startDate={startDate} endDate={endDate} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

const Content = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  const { data } = useSuspenseQuery({
    queryKey: ["sales", startDate, endDate],
    queryFn: () =>
      getSalesData({
        startDate,
        endDate,
      }),
    retry: 0,
  });
  return (
    <div className="flex flex-col gap-4">
      {data.map((sale) => (
        <div key={sale.productId} className="w-full flex gap-4">
          <div>{sale.productName}</div>
          <div>{sale.revenue}</div>
          <div>{sale.unitsSold}</div>
          <div>{new Date(sale.date).toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
};
