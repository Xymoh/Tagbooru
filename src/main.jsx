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
        return { hasError: true, message: error?.message || "Unknown error" };
    }

    componentDidCatch(error) {
        console.error("Render crash:", error);
    }

    render() {
        if (this.state.hasError) {
            return (
                <main className="app-shell" style={{ paddingTop: "2rem" }}>
                    <section className="panel">
                        <h1 style={{ marginTop: 0 }}>UI Render Error</h1>
                        <p className="demo-text">The app crashed while rendering.</p>
                        <p className="demo-text">Check browser console for details.</p>
                        <p className="demo-text">Error: {this.state.message}</p>
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
