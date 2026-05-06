import { Component, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

class AppErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, message: "" };
    }

    static getDerivedStateFromError(error) {
        const message = error?.message || "Unknown error";
        console.error("Render crash:", error);
        return { hasError: true, message };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Render crash:", error);
        console.error("Component stack:", errorInfo?.componentStack);
    }

    handleRetry = () => {
        this.setState({ hasError: false, message: "" });
    };

    render() {
        if (this.state.hasError) {
            return (
                <main className="app-shell" style={{ paddingTop: "2rem" }}>
                    <section className="panel" role="alert">
                        <h1 style={{ marginTop: 0 }}>UI Render Error</h1>
                        <p className="demo-text">The app crashed while rendering.</p>
                        <p className="demo-text">Check browser console for details.</p>
                        <p className="demo-text" style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "0.85rem" }}>
                            Error: {this.state.message}
                        </p>
                        <button
                            type="button"
                            className="btn primary"
                            onClick={this.handleRetry}
                            style={{ marginTop: "1rem" }}
                        >
                            Try Again
                        </button>
                    </section>
                </main>
            );
        }

        return this.props.children;
    }
}

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AppErrorBoundary>
            <App />
        </AppErrorBoundary>
    </StrictMode>
);
