export default function ImageTagger() {
    return (
        <div className="panel">
            <h2>Tagbooru Local Image Tagger</h2>
            <p className="subtitle" style={{ marginBottom: "1.5rem" }}>
                A standalone, 1-click desktop app for anime image captioning.
            </p>

            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", alignItems: "flex-start" }}>
                <div style={{ flex: "1 1 300px" }}>
                    <p style={{ lineHeight: 1.6 }}>
                        To process your images securely and use your machine's full performance, we provide a dedicated desktop application. It runs completely offline, your images never leave your computer!
                    </p>
                    <ul style={{ lineHeight: 1.6, paddingLeft: "1.2rem", margin: "1.5rem 0" }}>
                        <li><strong>Local AI Processing:</strong> Powered by state-of-the-art WD14/SwinV2 models.</li>
                        <li><strong>Batch Tagging:</strong> Process entire folders of images instantly.</li>
                        <li><strong>LoRA Ready:</strong> Automatically saves <code>.txt</code> caption files alongside your images.</li>
                        <li><strong>Fully Configurable:</strong> Adjust tag thresholds, set blacklists/whitelists, and easily prune tags.</li>
                    </ul>

                    <div style={{ marginTop: "2rem", paddingBottom: "1rem" }}>
                        <a
                            href="https://github.com/Xymoh/img-tagboru-ai/releases/"
                            className="btn primary"
                            style={{ display: "inline-block", fontSize: "1.1rem", padding: "0.8rem 1.5rem", textDecoration: "none" }}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Download Img-Tagboru AI for Windows"
                        >
                            ↓ Download for Windows
                        </a>
                        <p style={{ marginTop: "0.5rem", fontSize: "0.85rem", color: "var(--muted)" }}>Requires Windows 10/11. Free and open source.</p>
                    </div>
                </div>
                
                <div style={{ flex: "1 1 300px", padding: "1.5rem", background: "rgba(0,0,0,0.2)", borderRadius: "12px", border: "1px solid var(--line)" }}>
                    <h3 style={{ marginTop: 0, color: "var(--primary)" }}>Why a separate download?</h3>
                    <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.6, marginBottom: 0 }}>
                        Running heavy AI vision models directly inside a web browser is incredibly slow and often hits memory limits. By downloading the standalone app, it automatically accesses your hardware graphics acceleration (GPU).
                        <br /><br />
                        This makes batch processing thousands of dataset images blazing fast, while ensuring 100% privacy for your personal galleries.
                    </p>
                </div>
            </div>
        </div>
    );
}
