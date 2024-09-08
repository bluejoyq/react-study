import { useSuspenseQuery } from "@tanstack/react-query";
import { getSalesData } from "../remotes/getSalesData";

export const Content = ({
  dateRange,
}: {
  dateRange: { startDate: string; endDate: string };
}) => {
  const { data } = useSuspenseQuery({
    queryKey: ["sales", dateRange.startDate, dateRange.endDate],
    queryFn: () => getSalesData(dateRange),
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
