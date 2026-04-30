export default function Home() {
    return (
        <div className="panel">
            <h2>Welcome to Tagbooru Toolkit</h2>
            <p className="subtitle" style={{ marginBottom: "1.5rem" }}>
                An all-in-one local tagging and prompt formatting tool for anime generative AI.
            </p>

            <h3>Features</h3>
            <ul style={{ lineHeight: 1.6, marginBottom: "2rem" }}>
                <li><strong>Text Formatter:</strong> Clean up noisy tags copied from Danbooru or other sources and automatically categorize them into organized prompt blocks (Character, Style, Composition, NSFW, etc.).</li>
                <li><strong>Image Tagger (Local Inference):</strong> Run WD14/SwinV2-style tagging on your own machine. Upload images, adjust thresholds, filter with blacklists/whitelists, edit tags, and export caption files for model/LoRA training.</li>
            </ul>

            <h3>Privacy First</h3>
            <p>
                This tool is built for local inference. When using the Image Tagger, your images never leave your machine—they are processed entirely by the local Python tagging service running in the background. The Text Formatter uses a large pre-downloaded offline CSV index of over 1 million Danbooru tags.
            </p>

            <div style={{ marginTop: "2.5rem", padding: "1.5rem", background: "rgba(0,0,0,0.2)", borderRadius: "12px", border: "1px solid var(--line)" }}>
                <h3>Support the Developer</h3>
                <p>
                    If this toolkit saves you time in your AI training and prompting workflows, consider supporting me!
                </p>
                <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                    <a href="https://ko-fi.com/saekimon" className="btn primary" style={{ textDecoration: "none" }} target="_blank" rel="noopener noreferrer">☕ Ko-fi</a>
                    <a href="#" className="btn ghost" style={{ textDecoration: "none" }} title="Coming soon">Patreon (Coming soon)</a>
                </div>
            </div>
        </div>
    );
}
