import React, { ErrorInfo, PropsWithChildren, ReactElement } from 'react';
import { logWSOD } from '../messages';

export type ErrorBoundaryProps = {
  fallback: ReactElement;
}

export class ErrorBoundary extends React.Component<PropsWithChildren<ErrorBoundaryProps>, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logWSOD({ error, errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}