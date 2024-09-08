import { http, HttpResponse } from "msw";
import { faker } from "@faker-js/faker";
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const isError = () => Math.random() < 0.3;
export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get("/hello", () => {
    return HttpResponse.json({
      name: faker.person.fullName(),
    });
  }),
  http.get("/api/sales", async ({ request }) => {
    await sleep(1500);
    if (isError()) {
      return HttpResponse.json(
        {
          error: "Failed to fetch sales data",
        },
        {
          status: 500,
        },
      );
    }
    const url = new URL(request.url);

    const startDate = url.searchParams.get("startDate") ?? "2024-09-01";
    const endDate = url.searchParams.get("endDate") ?? "2024-09-09";
    if (Date.parse(startDate) > Date.parse(endDate)) {
      return HttpResponse.json(
        {
          error: "Invalid date range",
        },
        {
          status: 400,
        },
      );
    }
    const salesData = Array.from({ length: 5 }, () => ({
      productId: faker.number.int({ min: 1, max: 1000 }),
      productName: faker.commerce.productName(),
      unitsSold: faker.number.int({ min: 1, max: 100 }),
      revenue: faker.number.float({ min: 100, max: 1000 }),
      date: faker.date.between({ from: startDate, to: endDate }).toISOString(),
    }));

    return HttpResponse.json(salesData);
  }),
];
