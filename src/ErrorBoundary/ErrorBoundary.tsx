import React, { ErrorInfo, PropsWithChildren } from 'react';

export class ErrorBoundary extends React.Component<PropsWithChildren, { hasError: boolean, error: any, errorInfo: any }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error) {
    console.log('error 1', error);
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('error 2', error);
    console.log('error 23', errorInfo);
    // You can also log the error to an error reporting service
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return <div>Error</div>
    }

    return this.props.children;
  }
}