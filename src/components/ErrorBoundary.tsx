import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
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
    console.error('Uncaught error in COTRAC application:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl max-w-md w-full p-6 text-center space-y-4">
            <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto text-2xl font-bold">
              !
            </div>
            <h2 className="text-xl font-bold text-slate-900">Application Notice</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              The application encountered an unexpected runtime state. You can reload or reset your local session to continue.
            </p>
            {this.state.error?.message && (
              <div className="text-xs font-mono bg-slate-100 text-slate-700 p-3 rounded-lg overflow-x-auto text-left max-h-24">
                {this.state.error.message}
              </div>
            )}
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => window.location.reload()}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors"
              >
                Reload
              </button>
              <button
                onClick={() => {
                  try {
                    localStorage.removeItem('cotrac_custom_user');
                    localStorage.removeItem('cotrac_active_tab');
                  } catch {}
                  window.location.href = '/';
                }}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-4 rounded-xl text-xs transition-colors"
              >
                Reset Session
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
