import { useMemo, useState } from "react";
import { splitAndCleanCandidates } from "./parser";
import { fetchDanbooruTags, pickBestTag } from "./tagService";
import { categorizeTag } from "./classifier";
import { danbooruToTagText, tagToDanbooruQuery, toPromptLine } from "./utils";

const OUTPUT_LAYOUT = [
    { key: "all", title: "All Matched Tags" },
    { key: "style", title: "Style / Quality" },
    { key: "character", title: "Character" },
    { key: "looks", title: "Looks / Appearance" },
    { key: "landscape", title: "Landscape / Scene" },
    { key: "action", title: "Action" },
    { key: "nsfw", title: "NSFW Detected" },
    { key: "other", title: "Other / Meta", full: true },
];

const EMPTY_OUTPUTS = {
    all: "",
    style: "",
    character: "",
    looks: "",
    landscape: "",
    action: "",
    nsfw: "",
    other: "",
};

export default function App() {
    const [inputText, setInputText] = useState("");
    const [status, setStatus] = useState({ text: "Ready.", isError: false });
    const [isLoading, setIsLoading] = useState(false);
    const [outputs, setOutputs] = useState(EMPTY_OUTPUTS);

    const statusClass = useMemo(() => `status${status.isError ? " error" : ""}`, [status]);

    const setError = (text) => setStatus({ text, isError: true });
    const setInfo = (text) => setStatus({ text, isError: false });

    const clearAll = () => {
        setInputText("");
        setOutputs(EMPTY_OUTPUTS);
        setInfo("Ready.");
    };

    const copyField = async (key) => {
        const value = outputs[key] ?? "";
        if (!value.trim()) {
            setError("Nothing to copy from this field.");
            return;
        }

        try {
            await navigator.clipboard.writeText(value);
            setInfo("Copied to clipboard.");
        } catch {
            setError("Clipboard blocked by browser. Copy manually.");
        }
    };

    const analyzeInput = async () => {
        if (!inputText.trim()) {
            setError("Paste text first.");
            return;
        }

        setIsLoading(true);
        setInfo("Analyzing and matching tags...");

        try {
            const candidates = splitAndCleanCandidates(inputText);
            if (!candidates.length) {
                setError("No valid candidates found.");
                return;
            }

            const allMatchedMap = new Map();
            const lowConfidenceOther = [];

            for (const candidate of candidates) {
                const query = tagToDanbooruQuery(candidate);
                const matches = await fetchDanbooruTags(query);
                const best = pickBestTag(candidate, matches);

                if (!best) {
                    lowConfidenceOther.push(candidate);
                    continue;
                }

                if (best.score < 35) {
                    lowConfidenceOther.push(candidate);
                    continue;
                }

                if (best.score < 55) {
                    lowConfidenceOther.push(danbooruToTagText(best.tag.name));
                }

                allMatchedMap.set(best.tag.name, best.tag);
            }

            const allMatched = [...allMatchedMap.values()];
            const buckets = {
                style: [],
                character: [],
                looks: [],
                landscape: [],
                action: [],
                nsfw: [],
                other: [],
            };

            for (const tag of allMatched) {
                const category = categorizeTag(tag);
                const text = danbooruToTagText(tag.name);
                buckets[category].push(text);
            }

            setOutputs({
                all: toPromptLine(allMatched.map((t) => danbooruToTagText(t.name))),
                style: toPromptLine([...new Set(buckets.style)]),
                character: toPromptLine([...new Set(buckets.character)]),
                looks: toPromptLine([...new Set(buckets.looks)]),
                landscape: toPromptLine([...new Set(buckets.landscape)]),
                action: toPromptLine([...new Set(buckets.action)]),
                nsfw: toPromptLine([...new Set(buckets.nsfw)]),
                other: toPromptLine([...new Set([...buckets.other, ...lowConfidenceOther])]),
            });

            if (allMatched.length === 0) {
                setError("No Danbooru tags matched confidently. Try cleaner words or shorter phrases.");
            } else {
                setInfo(`Done. Matched ${allMatched.length} tag${allMatched.length === 1 ? "" : "s"}.`);
            }
        } catch (error) {
            console.error(error);
            setError("Error while reaching Danbooru. Check internet connection and try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="bg-shape shape-a" />
            <div className="bg-shape shape-b" />

            <main className="app-shell">
                <header className="hero">
                    <p className="eyebrow">Prompt Toolkit</p>
                    <h1>Danbooru Smart Formatter</h1>
                    <p className="subtitle">Paste noisy text in any format, match probable Danbooru tags, then copy clean grouped prompts.</p>
                </header>

                <section className="panel demo-note">
                    <p className="demo-title">Alpha Build</p>
                    <p className="demo-text">This is a alpha version. Feedback and comments are welcome.</p>
                    <p className="demo-text">DM on Discord: <strong>sathean</strong> (icon: Miku + Leon Kennedy).</p>
                </section>

                <section className="panel">
                    <label htmlFor="inputText">Raw Input</label>
                    <textarea
                        id="inputText"
                        value={inputText}
                        onChange={(event) => setInputText(event.target.value)}
                        placeholder={"?\n1girl 7.6M\n?\nandroid 29k\nblack gloves 604k"}
                    />
                    <div className="actions">
                        <button type="button" className="btn primary" onClick={analyzeInput} disabled={isLoading}>
                            {isLoading ? "Analyzing..." : "Analyze Tags"}
                        </button>
                        <button type="button" className="btn ghost" onClick={clearAll} disabled={isLoading}>
                            Clear
                        </button>
                    </div>
                    <p className={statusClass}>{status.text}</p>
                </section>

                <section className="panel outputs-grid">
                    {OUTPUT_LAYOUT.map((output) => (
                        <article key={output.key} className={`output-card${output.full ? " full-width" : ""}`}>
                            <div className="card-head">
                                <h2>{output.title}</h2>
                                <button
                                    type="button"
                                    className="copy-btn"
                                    onClick={() => copyField(output.key)}
                                >
                                    Copy
                                </button>
                            </div>
                            <textarea value={outputs[output.key]} readOnly />
                        </article>
                    ))}
                </section>
            </main>
        </>
    );
}
