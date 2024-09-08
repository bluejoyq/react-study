import { DateRange, SalesData } from "../models";

const parseQS = (params: Record<string, string | number | undefined>) => {
  return Object.keys(params)
    .filter((key) => params[key] != null)
    .map((key) => `${key}=${params[key]}`)
    .join("&");
};

export const getSalesData = async (
  dateRange: Partial<DateRange>,
): Promise<SalesData[]> => {
  const response = await fetch(`/api/sales?${parseQS(dateRange)}`);
  if (!response.ok) {
    throw new Error("Failed to fetch sales data");
  }
  return response.json();
};
