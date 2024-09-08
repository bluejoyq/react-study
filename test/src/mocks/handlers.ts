import { http, HttpResponse } from 'msw'
import { faker } from '@faker-js/faker';

export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get('/hello', () => {
    return HttpResponse.json({
      name: faker.person.fullName(),
    })
  }),
]