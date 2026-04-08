import React from 'react';

interface State { hasError: boolean; error?: Error }

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('App crash:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'serif', background: '#1B2A4A', color: 'white', textAlign: 'center', padding: '2rem' }}>
          <div>
            <h1 style={{ color: '#F5A623', fontSize: '2rem', marginBottom: '1rem' }}>Editora Vértice Literário</h1>
            <p style={{ color: '#94a3b8' }}>Ocorreu um erro inesperado. Por favor, recarregue a página.</p>
            <button onClick={() => window.location.reload()} style={{ marginTop: '1.5rem', background: '#F5A623', color: '#1B2A4A', border: 'none', padding: '0.75rem 2rem', fontWeight: 'bold', cursor: 'pointer', borderRadius: '2px' }}>
              Recarregar
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
