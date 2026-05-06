import { useCallback, useMemo, useState } from "react";
import { splitAndCleanCandidates } from "./parser";
import { ensureLocalTagIndexLoaded, fetchDanbooruTags, pickBestTag } from "./tagService";
import { categorizeTag } from "./classifier";
import { danbooruToTagText, tagToDanbooruQuery, toPromptLine } from "./utils";
import { SCORE_DISCARD, SCORE_LOW_CONFIDENCE } from "./constants";

const OUTPUT_LAYOUT = [
    { key: "all", title: "All Matched Tags" },
    { key: "style", title: "Style / Quality" },
    { key: "character", title: "Character" },
    { key: "looks", title: "Looks / Appearance" },
    { key: "composition", title: "Composition / Framing" },
    { key: "landscape", title: "Landscape / Scene" },
    { key: "action", title: "Action" },
    { key: "nsfw", title: "NSFW Detected" },
    { key: "copyright", title: "Copyright / Franchise" },
    { key: "other", title: "Other / Meta", full: true },
];

const EMPTY_OUTPUTS = {
    all: "",
    style: "",
    character: "",
    looks: "",
    composition: "",
    landscape: "",
    action: "",
    nsfw: "",
    copyright: "",
    other: "",
};

/** Count the number of tags in a comma-separated prompt line string. */
function countTags(outputValue) {
    if (!outputValue || !outputValue.trim()) return 0;
    return outputValue.split(",").filter((s) => s.trim().length > 0).length;
}

export default function TextFormatter() {
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

    const copyAll = async () => {
        const combined = OUTPUT_LAYOUT.map(({ key, title }) => {
            const value = outputs[key] ?? "";
            if (!value.trim()) return null;
            return `${title}:\n${value}`;
        })
            .filter(Boolean)
            .join("\n\n");

        if (!combined) {
            setError("Nothing to copy. Generate some output first.");
            return;
        }

        try {
            await navigator.clipboard.writeText(combined);
            setInfo("All outputs copied to clipboard.");
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
        setInfo("Loading full local tag index...");

        try {
            // Load the local tag index if available and keep a reference to it.
            // We'll use this to detect two-word fragments that are actually
            // two independent tags (e.g. "female ass" -> "female", "ass").
            let localMap = null;
            try {
                localMap = await ensureLocalTagIndexLoaded();
            } catch {
                setInfo("Local tag index unavailable, falling back to online matching...");
            }

            const candidates = splitAndCleanCandidates(inputText);
            if (!candidates.length) {
                setError("No valid candidates found.");
                return;
            }

            setInfo("Analyzing and matching tags...");

            const allMatchedMap = new Map();
            const lowConfidenceOther = [];

            for (const candidate of candidates) {
                // If candidate is a simple two-word phrase and localMap contains
                // both words as standalone tags, match them individually to
                // avoid prefix-based false positives from combined queries.
                if (candidate.includes(" ") && localMap && typeof localMap.has === "function") {
                    const parts = candidate.split(" ").map((s) => s.trim()).filter(Boolean);
                    if (parts.length === 2) {
                        const q0 = tagToDanbooruQuery(parts[0]);
                        const q1 = tagToDanbooruQuery(parts[1]);
                        if (localMap.has(q0) && localMap.has(q1)) {
                            // Match first part
                            const matches0 = await fetchDanbooruTags(q0);
                            const best0 = pickBestTag(parts[0], matches0);
                            if (!best0) {
                                lowConfidenceOther.push(parts[0]);
                            } else if (best0.score < SCORE_DISCARD) {
                                lowConfidenceOther.push(parts[0]);
                            } else {
                                if (best0.score < SCORE_LOW_CONFIDENCE) {
                                    lowConfidenceOther.push(danbooruToTagText(best0.tag.name));
                                }
                                allMatchedMap.set(best0.tag.name, best0.tag);
                            }

                            // Match second part
                            const matches1 = await fetchDanbooruTags(q1);
                            const best1 = pickBestTag(parts[1], matches1);
                            if (!best1) {
                                lowConfidenceOther.push(parts[1]);
                            } else if (best1.score < SCORE_DISCARD) {
                                lowConfidenceOther.push(parts[1]);
                            } else {
                                if (best1.score < SCORE_LOW_CONFIDENCE) {
                                    lowConfidenceOther.push(danbooruToTagText(best1.tag.name));
                                }
                                allMatchedMap.set(best1.tag.name, best1.tag);
                            }

                            // Skip the combined match flow for this candidate.
                            continue;
                        }
                    }
                }

                const query = tagToDanbooruQuery(candidate);
                const matches = await fetchDanbooruTags(query);
                const best = pickBestTag(candidate, matches);

                if (!best) {
                    lowConfidenceOther.push(candidate);
                    continue;
                }

                if (best.score < SCORE_DISCARD) {
                    lowConfidenceOther.push(candidate);
                    continue;
                }

                if (best.score < SCORE_LOW_CONFIDENCE) {
                    lowConfidenceOther.push(danbooruToTagText(best.tag.name));
                }

                allMatchedMap.set(best.tag.name, best.tag);
            }

            const allMatched = [...allMatchedMap.values()];
            const buckets = {
                style: [],
                character: [],
                looks: [],
                composition: [],
                landscape: [],
                action: [],
                nsfw: [],
                copyright: [],
                other: [],
            };

            for (const tag of allMatched) {
                const category = categorizeTag(tag);
                const text = danbooruToTagText(tag.name);
                if (buckets[category]) {
                    buckets[category].push(text);
                } else {
                    buckets.other.push(text);
                }
            }

            setOutputs({
                all: toPromptLine(allMatched.map((t) => danbooruToTagText(t.name))),
                style: toPromptLine([...new Set(buckets.style)]),
                character: toPromptLine([...new Set(buckets.character)]),
                looks: toPromptLine([...new Set(buckets.looks)]),
                composition: toPromptLine([...new Set(buckets.composition)]),
                landscape: toPromptLine([...new Set(buckets.landscape)]),
                action: toPromptLine([...new Set(buckets.action)]),
                nsfw: toPromptLine([...new Set(buckets.nsfw)]),
                copyright: toPromptLine([...new Set(buckets.copyright)]),
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

    // Safe wrapper that catches any unhandled rejections from the async onClick.
    const handleAnalyzeClick = useCallback(() => {
        analyzeInput().catch((err) => {
            console.error(err);
            setError("An unexpected error occurred. Please try again.");
        });
    }, [inputText]);

    // ---- Derived tag counts for card headings ----
    const tagCounts = useMemo(() => {
        const counts = {};
        for (const { key } of OUTPUT_LAYOUT) {
            counts[key] = countTags(outputs[key] ?? "");
        }
        return counts;
    }, [outputs]);

    return (
        <div className="panel">
            <section className="panel demo-note" style={{ marginTop: 0 }}>
                <p className="demo-title">Danbooru Smart Formatter</p>
                <p className="demo-text">
                    Paste noisy text in any format, match probable Danbooru tags, then copy clean grouped prompts.
                </p>
            </section>

            <section className="panel">
                <label htmlFor="inputText">Raw Input</label>
                <textarea
                    id="inputText"
                    value={inputText}
                    onChange={(event) => setInputText(event.target.value)}
                    placeholder={"?\n1girl 7.6M\n?\nandroid 29k\nblack gloves 604k"}
                    aria-label="Raw input text to parse"
                />
                <div className="actions">
                    <button
                        type="button"
                        className="btn primary"
                        onClick={handleAnalyzeClick}
                        disabled={isLoading}
                        aria-busy={isLoading}
                    >
                        {isLoading ? (
                            <span className="loading-indicator">
                                <span className="spinner" aria-hidden="true" />
                                Analyzing...
                            </span>
                        ) : (
                            "Analyze Tags"
                        )}
                    </button>
                    <button type="button" className="btn ghost" onClick={clearAll} disabled={isLoading}>
                        Clear
                    </button>
                    <button
                        type="button"
                        className="btn copy-all-btn"
                        onClick={copyAll}
                        disabled={isLoading}
                        aria-label="Copy all outputs to clipboard"
                    >
                        Copy All
                    </button>
                </div>
                <p
                    className={statusClass}
                    role="status"
                    aria-live="polite"
                >
                    {isLoading && <span className="sr-only">Loading in progress.</span>}
                    {status.text}
                </p>
            </section>

            <section className="panel outputs-grid" aria-label="Output categories">
                {OUTPUT_LAYOUT.map((output) => {
                    const count = tagCounts[output.key] ?? 0;
                    return (
                        <article key={output.key} className={`output-card${output.full ? " full-width" : ""}`}>
                            <div className="card-head">
                                <h2>
                                    {output.title}
                                    {count > 0 && <span className="tag-count">{count}</span>}
                                </h2>
                                <button
                                    type="button"
                                    className="copy-btn"
                                    onClick={() => copyField(output.key)}
                                    aria-label={`Copy ${output.title} to clipboard`}
                                >
                                    Copy
                                </button>
                            </div>
                            <textarea
                                value={outputs[output.key]}
                                readOnly
                                aria-label={output.title}
                            />
                        </article>
                    );
                })}
            </section>
        </div>
    );
}
