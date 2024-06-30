export function handleError(error: unknown): Error {
  if (error instanceof Error) {
    return error;
  }
  if (typeof error === "string") {
    return new Error(error);
  }

  return new Error("알 수 없는 오류가 발생했습니다.");
}
