import { useState } from "react";
import Home from "./components/Home";
import TextFormatter from "./TextFormatter";
import ImageTagger from "./components/ImageTagger";
import "./styles.css";

const TABS = [
    { key: "home", label: "Home", ariaLabel: "Home page" },
    { key: "text", label: "Text Formatter", ariaLabel: "Text formatting tool" },
    { key: "image", label: "Image Tagger", ariaLabel: "Image tagging tool download" },
];

export default function App() {
    const [currentTab, setCurrentTab] = useState("home");

    return (
        <>
            <div className="bg-shape shape-a" aria-hidden="true" />
            <div className="bg-shape shape-b" aria-hidden="true" />

            <div className="app-shell">
                <header className="hero" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <div>
                        <p className="eyebrow">Visual Toolkit</p>
                        <h1>Tagbooru Toolkit</h1>
                    </div>
                </header>

                <nav role="navigation" aria-label="Main navigation" style={{ display: "flex", gap: "1rem", marginBottom: "2rem", borderBottom: "1px solid var(--line)", paddingBottom: "1rem" }}>
                    {TABS.map((tab) => (
                        <button
                            key={tab.key}
                            className={`nav-btn ${currentTab === tab.key ? "active" : ""}`}
                            onClick={() => setCurrentTab(tab.key)}
                            aria-label={tab.ariaLabel}
                            aria-current={currentTab === tab.key ? "page" : undefined}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>

                <main id="main-content" className="content">
                    {currentTab === "home" && <Home />}
                    {currentTab === "text" && <TextFormatter />}
                    {currentTab === "image" && <ImageTagger />}
                </main>
            </div>
        </>
    );
}
