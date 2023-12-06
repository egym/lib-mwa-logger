import React, { ErrorInfo, PropsWithChildren, ReactElement } from "react";
import { logWSOD } from "../messages";

export type ErrorBoundaryProps = {
  fallback: ReactElement<{ error: Error }>;
};

export class ErrorBoundary extends React.Component<
  PropsWithChildren<ErrorBoundaryProps>,
  { hasError: boolean; error: Error | null; errorInfo: ErrorInfo | null }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logWSOD({ error, errorInfo });
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError && this.state.error !== null) {
      return React.cloneElement(this.props.fallback, {
        error: this.state.error,
      });
    }

    return this.props.children;
  }
}
