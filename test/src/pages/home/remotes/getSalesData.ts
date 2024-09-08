import { NetworkError } from "../../../errors/NetworkError";
import { DateRange, SalesData } from "../models";

const parseQS = (params: Record<string, string | number | undefined>) => {
  return Object.keys(params)
    .filter((key) => params[key] != null)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key]!)}`,
    )
    .join("&");
};

export const getSalesData = async (
  dateRange: Partial<DateRange>,
): Promise<SalesData[]> => {
  const response = await fetch(`/api/sales?${parseQS(dateRange)}`);
  if (response.ok === false) {
    throw new NetworkError(response);
  }
  return response.json();
};
