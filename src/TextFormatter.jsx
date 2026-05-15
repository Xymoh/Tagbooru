import { useCallback, useMemo, useState } from "react";
import { useBorderTrace } from "./hooks/useBorderTrace";
import { splitAndCleanCandidates } from "./parser";
import {
    ensureLocalTagIndexLoaded,
    fetchDanbooruTags,
    pickBestTag,
    resolveAllCategories,
} from "./tagService";
import { categorizeTag, CATEGORY_TITLES, CATEGORY_ORDER } from "./classifier";
import { danbooruToTagText, tagToDanbooruQuery, toPromptLine } from "./utils";
import { SCORE_DISCARD, SCORE_LOW_CONFIDENCE, getFranchiseLabel } from "./constants";

// ---------------------------------------------------------------------------
// Small wrappers that attach the border-trace SVG animation
// ---------------------------------------------------------------------------

function TracedCard({ className, children, radius = 14, color }) {
    const ref = useBorderTrace({ radius, color });
    return <article ref={ref} className={className}>{children}</article>;
}

function TracedButton({ className, onClick, type = "button", disabled, "aria-label": ariaLabel, "aria-busy": ariaBusy, children, radius = 10, color }) {
    const ref = useBorderTrace({ radius, color });
    return (
        <button ref={ref} type={type} className={className} onClick={onClick}
            disabled={disabled} aria-label={ariaLabel} aria-busy={ariaBusy}>
            {children}
        </button>
    );
}

function TracedCopyBtn({ onClick, "aria-label": ariaLabel, children, color }) {
    const ref = useBorderTrace({ radius: 8, color });
    return (
        <button ref={ref} type="button" className="copy-btn" onClick={onClick} aria-label={ariaLabel}>
            {children}
        </button>
    );
}

// ---------------------------------------------------------------------------
// Layout definition
// ---------------------------------------------------------------------------

/**
 * Each entry describes one output card in the results grid.
 *
 * @property {string}  key             – unique slug matching output state keys
 * @property {string}  title           – human-readable card heading
 * @property {boolean} [full]          – span the full grid width
 * @property {boolean} [isSourceMaterial] – derived "Source Material" card
 * @property {boolean} [hideable]      – card can be toggled off by the user
 */

const OUTPUT_LAYOUT = [
    { key: "all",            title: "All Matched Tags",                                  full: true },
    { key: "character",      title: CATEGORY_TITLES.character },
    { key: "source_material",title: "Source Material",         isSourceMaterial: true, hideable: true },
    { key: "copyright",      title: CATEGORY_TITLES.copyright },
    { key: "artist",         title: CATEGORY_TITLES.artist },
    { key: "general",        title: CATEGORY_TITLES.general },
    { key: "style",          title: CATEGORY_TITLES.style },
    { key: "looks",          title: CATEGORY_TITLES.looks },
    { key: "landscape",      title: CATEGORY_TITLES.landscape },
    { key: "action",         title: CATEGORY_TITLES.action },
    { key: "composition",    title: CATEGORY_TITLES.composition },
    { key: "nsfw",           title: CATEGORY_TITLES.nsfw },
    { key: "meta",           title: CATEGORY_TITLES.meta },
    { key: "unknown",        title: CATEGORY_TITLES.unknown,   full: true },
];

/** Pre-built empty outputs object matching every key in OUTPUT_LAYOUT. */
const EMPTY_OUTPUTS = Object.fromEntries(OUTPUT_LAYOUT.map(({ key }) => [key, ""]));

/** Category slugs that are direct tag buckets (not derived). */
const TAG_BUCKET_KEYS = new Set([
    "character", "copyright", "artist", "general", "style",
    "looks", "landscape", "action", "composition", "nsfw", "meta", "unknown",
]);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Count the number of tags in a comma-separated prompt line string. */
function countTags(outputValue) {
    if (!outputValue || !outputValue.trim()) return 0;
    return outputValue.split(",").filter((s) => s.trim().length > 0).length;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function TextFormatter() {
    const [inputText, setInputText] = useState("");
    const [status, setStatus] = useState({ text: "Ready.", isError: false });
    const [isLoading, setIsLoading] = useState(false);
    const [outputs, setOutputs] = useState(EMPTY_OUTPUTS);
    const [showSourceMaterial, setShowSourceMaterial] = useState(true);

    // ---- derived state --------------------------------------------------------
    const statusClass = useMemo(() => `status${status.isError ? " error" : ""}`, [status]);

    const setError = (text) => setStatus({ text, isError: true });
    const setInfo = (text) => setStatus({ text, isError: false });

    // ---- actions --------------------------------------------------------------

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
        const combined = OUTPUT_LAYOUT
            .filter(({ key, hideable }) => {
                if (hideable && key === "source_material" && !showSourceMaterial) return false;
                return true;
            })
            .map(({ key, title }) => {
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

    // ---- main analysis pipeline -----------------------------------------------

    const analyzeInput = async () => {
        if (!inputText.trim()) {
            setError("Paste text first.");
            return;
        }

        setIsLoading(true);
        setInfo("Loading local tag index...");

        try {
            // 1. Load the local tag index (best-effort).
            let localMap = null;
            try {
                localMap = await ensureLocalTagIndexLoaded();
            } catch {
                setInfo("Local tag index unavailable, falling back to online matching...");
            }

            // 2. Parse candidates from raw input.
            const candidates = splitAndCleanCandidates(inputText);
            if (!candidates.length) {
                setError("No valid candidates found.");
                return;
            }

            setInfo("Matching tags via Danbooru API...");

            // 3. Match each candidate against the Danbooru API.
            const allMatchedMap = new Map();
            const lowConfidenceOther = [];

            for (const candidate of candidates) {
                // Two-word fragment heuristic: if localMap has both words as
                // standalone tags, match them independently.
                if (candidate.includes(" ") && localMap && typeof localMap.has === "function") {
                    const parts = candidate.split(" ").map((s) => s.trim()).filter(Boolean);
                    if (parts.length === 2) {
                        const q0 = tagToDanbooruQuery(parts[0]);
                        const q1 = tagToDanbooruQuery(parts[1]);
                        if (localMap.has(q0) && localMap.has(q1)) {
                            for (const part of parts) {
                                const matches = await fetchDanbooruTags(tagToDanbooruQuery(part));
                                const best = pickBestTag(part, matches);
                                if (!best || best.score < SCORE_DISCARD) {
                                    lowConfidenceOther.push(part);
                                } else {
                                    if (best.score < SCORE_LOW_CONFIDENCE) {
                                        lowConfidenceOther.push(danbooruToTagText(best.tag.name));
                                    }
                                    allMatchedMap.set(best.tag.name, best.tag);
                                }
                            }
                            continue;
                        }
                    }
                }

                const query = tagToDanbooruQuery(candidate);
                const matches = await fetchDanbooruTags(query);
                const best = pickBestTag(candidate, matches);

                if (!best || best.score < SCORE_DISCARD) {
                    lowConfidenceOther.push(candidate);
                    continue;
                }

                if (best.score < SCORE_LOW_CONFIDENCE) {
                    lowConfidenceOther.push(danbooruToTagText(best.tag.name));
                }

                allMatchedMap.set(best.tag.name, best.tag);
            }

            const allMatched = [...allMatchedMap.values()];

            if (allMatched.length === 0) {
                setError("No Danbooru tags matched confidently. Try cleaner words or shorter phrases.");
                return;
            }

            // 4. Batch-resolve real Danbooru categories for every matched tag.
            setInfo("Resolving tag categories...");
            await resolveAllCategories(allMatched, (completed, total) => {
                setInfo(`Resolving categories... ${completed}/${total}`);
            });

            // 5. Categorise every tag using the API-first classifier.
            const buckets = {};
            for (const key of TAG_BUCKET_KEYS) {
                buckets[key] = [];
            }

            for (const tag of allMatched) {
                const category = categorizeTag(tag);
                const text = danbooruToTagText(tag.name);
                if (buckets[category]) {
                    buckets[category].push(text);
                } else {
                    buckets.unknown.push(text);
                }
            }

            // 6. Sort each bucket alphabetically.
            for (const key of Object.keys(buckets)) {
                buckets[key] = [...new Set(buckets[key])].sort((a, b) =>
                    a.toLowerCase().localeCompare(b.toLowerCase()),
                );
            }

            // 7. Derive "Source Material" from copyright tags.
            const franchiseSet = new Set();
            for (const tag of allMatched) {
                const cat = typeof tag.category === "number" ? tag.category : 0;
                if (cat === 3 /* COPYRIGHT */) {
                    const label = getFranchiseLabel(tag.name);
                    if (label) {
                        franchiseSet.add(label);
                    }
                }
            }
            const sourceMaterialLine = [...franchiseSet].sort().join(", ");
            const sourceMaterialOutput = sourceMaterialLine ? `${sourceMaterialLine},` : "";

            // 8. Build the "All" bucket (ordered by CATEGORY_ORDER, then alphabetically).
            const allTags = [];
            for (const catKey of CATEGORY_ORDER) {
                if (buckets[catKey]) {
                    allTags.push(...buckets[catKey]);
                }
            }
            // Append low-confidence unmatched items at the very end.
            if (lowConfidenceOther.length) {
                allTags.push(...lowConfidenceOther);
            }

            // 9. Assemble final outputs.
            const newOutputs = { ...EMPTY_OUTPUTS };
            newOutputs.all = toPromptLine(allTags);
            newOutputs.source_material = sourceMaterialOutput;
            for (const key of TAG_BUCKET_KEYS) {
                newOutputs[key] = toPromptLine(buckets[key]);
            }

            setOutputs(newOutputs);
            setInfo(`Done. Matched ${allMatched.length} tag${allMatched.length === 1 ? "" : "s"}.`);
        } catch (error) {
            console.error(error);
            setError("Error while reaching Danbooru. Check internet connection and try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Safe wrapper for onClick.
    const handleAnalyzeClick = useCallback(() => {
        analyzeInput().catch((err) => {
            console.error(err);
            setError("An unexpected error occurred. Please try again.");
        });
    }, [inputText]);

    // ---- derived tag counts for card headings ----------------------------------

    const tagCounts = useMemo(() => {
        const counts = {};
        for (const { key } of OUTPUT_LAYOUT) {
            counts[key] = countTags(outputs[key] ?? "");
        }
        return counts;
    }, [outputs]);

    // ---- render ----------------------------------------------------------------

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
                    <TracedButton className="btn ghost" onClick={clearAll} disabled={isLoading}>
                        Clear
                    </TracedButton>
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
                {/* Source Material toggle */}
                <div className="outputs-grid-header">
                    <h2>Results</h2>
                    <label className="toggle-switch" htmlFor="toggle-source-material">
                        <input
                            id="toggle-source-material"
                            type="checkbox"
                            checked={showSourceMaterial}
                            onChange={(e) => setShowSourceMaterial(e.target.checked)}
                        />
                        <span className="toggle-slider" />
                        <span className="toggle-label">Source Material</span>
                    </label>
                </div>

                {OUTPUT_LAYOUT.map((output) => {
                    // Hide Source Material card when toggled off.
                    if (output.hideable && output.key === "source_material" && !showSourceMaterial) {
                        return null;
                    }

                    const count = tagCounts[output.key] ?? 0;
                    const cardClasses = [
                        "output-card",
                        output.full ? "full-width" : "",
                        output.isSourceMaterial ? "source-material" : "",
                        output.key === "unknown" ? "unknown-card" : "",
                    ]
                        .filter(Boolean)
                        .join(" ");

                    return (
                        <TracedCard
                            key={output.key}
                            className={cardClasses}
                            color={output.isSourceMaterial ? "#818cf8" : undefined}
                            radius={14}
                        >
                            <div className="card-head">
                                <h2>
                                    {output.title}
                                    {count > 0 && (
                                        <span className={`tag-count${output.isSourceMaterial ? " source-badge" : ""}`}>
                                            {count}
                                        </span>
                                    )}
                                </h2>
                                <TracedCopyBtn
                                    onClick={() => copyField(output.key)}
                                    aria-label={`Copy ${output.title} to clipboard`}
                                    color={output.isSourceMaterial ? "#818cf8" : undefined}
                                >
                                    Copy
                                </TracedCopyBtn>
                            </div>
                            <textarea
                                value={outputs[output.key]}
                                readOnly
                                aria-label={output.title}
                            />
                        </TracedCard>
                    );
                })}
            </section>
        </div>
    );
}
