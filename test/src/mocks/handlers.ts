import { http, HttpResponse } from "msw";
import { faker } from "@faker-js/faker";

export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get("/hello", () => {
    return HttpResponse.json({
      name: faker.person.fullName(),
    });
  }),
  http.get("/api/sales", ({ params }) => {
    const startDate =
      (params["startDate"] as string | undefined) ?? "2024-09-01";
    const endDate = (params["endDate"] as string | undefined) ?? "2024-09-09";

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
