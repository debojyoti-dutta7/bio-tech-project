import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './ui/Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-6">
          <div className="text-center max-w-md">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500 mx-auto mb-4">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-semibold text-text mb-2">Something went wrong</h2>
            <p className="text-sm text-muted mb-6">
              {this.state.error?.message || 'An unexpected error occurred.'}
            </p>
            <Button
              onClick={() => {
                this.setState({ hasError: false });
                window.location.reload();
              }}
              icon={<RefreshCw className="h-4 w-4" />}
            >
              Reload Application
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
