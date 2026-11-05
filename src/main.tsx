import React, { Component, ErrorInfo, ReactNode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App";
import "./styles/index.css";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught runtime error in Lithos App:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: "100vh",
          backgroundColor: "#0c0c0d",
          color: "#E6E4DC",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          fontFamily: "monospace",
          textAlign: "center"
        }}>
          <h1 style={{ color: "#A83824", fontSize: "1.5rem", marginBottom: "1rem" }}>
            LITHOS RECORDINGS // ARCHIVAL INITIALIZATION
          </h1>
          <p style={{ color: "#9E9B91", maxWidth: "600px", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
            An unexpected error occurred during audio-visual initialization.
          </p>
          <pre style={{
            background: "#161619",
            padding: "1rem",
            border: "1px solid #25252b",
            color: "#A83824",
            fontSize: "0.75rem",
            maxWidth: "700px",
            overflowX: "auto",
            marginBottom: "1.5rem"
          }}>
            {this.state.error?.message || "Unknown error"}
          </pre>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            style={{
              backgroundColor: "#A83824",
              color: "#fff",
              border: "none",
              padding: "0.75rem 1.5rem",
              fontSize: "0.75rem",
              fontWeight: "bold",
              cursor: "pointer",
              letterSpacing: "0.1em"
            }}
          >
            RESET ARCHIVE CACHE & RELOAD
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
