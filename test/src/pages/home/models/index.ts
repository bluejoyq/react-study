export interface SalesData {
  productId: number;
  productName: string;
  unitsSold: number;
  revenue: number;
  date: string; // 'YYYY-MM-DDTHH:MM:SSZ' 형식
}

export interface DateRange {
  startDate: string; // 'YYYY-MM-DD' 형식
  endDate: string;   // 'YYYY-MM-DD' 형식
}