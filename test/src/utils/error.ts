import { NetworkError } from "../errors/NetworkError";

export const isNetworkError = (error: unknown): error is NetworkError => {
  return error instanceof NetworkError;
};
