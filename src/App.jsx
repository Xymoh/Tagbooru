import { useState } from "react";
import Home from "./components/Home";
import TextFormatter from "./TextFormatter";
import ImageTagger from "./components/ImageTagger";
import "./styles.css";

export default function App() {
    const [currentTab, setCurrentTab] = useState("home");

    return (
        <>
            <div className="bg-shape shape-a" />
            <div className="bg-shape shape-b" />

            <main className="app-shell">
                <header className="hero" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <div>
                        <p className="eyebrow">Visual Toolkit</p>
                        <h1>Tagbooru Toolkit</h1>
                    </div>
                </header>

                <nav style={{ display: "flex", gap: "1rem", marginBottom: "2rem", borderBottom: "1px solid var(--line)", paddingBottom: "1rem" }}>
                    <button 
                        className={`nav-btn ${currentTab === "home" ? "active" : ""}`} 
                        onClick={() => setCurrentTab("home")}
                    >
                        Home
                    </button>
                    <button 
                        className={`nav-btn ${currentTab === "text" ? "active" : ""}`} 
                        onClick={() => setCurrentTab("text")}
                    >
                        Text Formatter
                    </button>
                    <button 
                        className={`nav-btn ${currentTab === "image" ? "active" : ""}`} 
                        onClick={() => setCurrentTab("image")}
                    >
                        Image Tagger
                    </button>
                </nav>

                <section className="content">
                    {currentTab === "home" && <Home />}
                    {currentTab === "text" && <TextFormatter />}
                    {currentTab === "image" && <ImageTagger />}
                </section>
            </main>
        </>
    );
}
