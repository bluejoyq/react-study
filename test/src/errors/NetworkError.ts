export class NetworkError extends Error {
  response: Response;
  constructor(response: Response) {
    super(`Network error: ${response.statusText}`);
    this.response = response;
  }
}
