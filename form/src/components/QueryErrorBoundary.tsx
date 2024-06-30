import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { PropsWithChildren, ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface QueryErrorResetBoundaryProps extends PropsWithChildren {
  fallbackRender: ({
    error,
    resetErrorBoundary,
  }: {
    error: Error;
    resetErrorBoundary: () => void;
  }) => ReactNode;
}
export function QueryErrorBoundary({
  children,
  fallbackRender,
}: QueryErrorResetBoundaryProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} fallbackRender={fallbackRender}>
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
