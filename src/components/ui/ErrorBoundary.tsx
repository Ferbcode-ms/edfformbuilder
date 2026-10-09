"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "./Button";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center p-12 text-center border border-border/50 rounded-2xl bg-background-secondary/20 h-full min-h-[400px]">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-6">
            <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold tracking-tight mb-2">Something went wrong.</h3>
          <p className="text-foreground-secondary mb-8 max-w-md">
            Your information is still here. Try generating the document again or go back to edit.
          </p>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => this.setState({ hasError: false, error: null })}>
              Try again
            </Button>
            {this.props.onReset && (
              <Button onClick={() => {
                this.setState({ hasError: false, error: null });
                this.props.onReset!();
              }}>
                Back to edit
              </Button>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
