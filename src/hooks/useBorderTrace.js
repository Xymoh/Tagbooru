import { useEffect, useRef } from "react";

/**
 * Draws an animated SVG border that traces clockwise around the element on
 * mouseenter and un-traces on mouseleave.
 *
 * Uses a <path> (not <rect>) so the stroke starts at the top-center,
 * making the seam invisible. pathLength="1" keeps dashoffset math simple.
 *
 * @param {object} options
 * @param {string}  [options.color="#f97316"]  Stroke colour
 * @param {number}  [options.radius=14]        Border-radius in px (match CSS)
 * @param {number}  [options.strokeWidth=2]    Stroke width in px
 * @param {number}  [options.duration=520]     Animation duration in ms
 */
export function useBorderTrace({
    color = "#f97316",
    radius = 14,
    strokeWidth = 2,
    duration = 520,
} = {}) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const NS = "http://www.w3.org/2000/svg";

        const svg = document.createElementNS(NS, "svg");
        svg.setAttribute("aria-hidden", "true");
        svg.style.position = "absolute";
        svg.style.top = "0";
        svg.style.left = "0";
        svg.style.pointerEvents = "none";
        svg.style.overflow = "visible";
        svg.style.zIndex = "10";

        const path = document.createElementNS(NS, "path");
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", color);
        path.setAttribute("stroke-width", String(strokeWidth));
        path.setAttribute("stroke-linecap", "butt");
        path.setAttribute("stroke-linejoin", "round");
        path.setAttribute("pathLength", "1");
        path.style.strokeDasharray = "1.05"; // slight overlap guarantees seam closes
        path.style.strokeDashoffset = "1";
        path.style.opacity = "0";

        svg.appendChild(path);
        el.appendChild(svg);

        function buildPath(w, h, r) {
            // Rounded-rect path starting at top-center, going clockwise.
            // This puts the seam at the top-middle where it's least visible.
            const cx = w / 2; // start x = horizontal center of top edge
            const s = strokeWidth / 2;
            const x = s, y = s;
            const W = w - strokeWidth, H = h - strokeWidth;

            return [
                `M ${cx} ${y}`,                              // start: top-center
                `H ${x + W - r}`,                            // → top-right before corner
                `Q ${x + W} ${y} ${x + W} ${y + r}`,        // ⌐ top-right corner
                `V ${y + H - r}`,                            // ↓ right side
                `Q ${x + W} ${y + H} ${x + W - r} ${y + H}`,// ⌐ bottom-right corner
                `H ${x + r}`,                                // ← bottom side
                `Q ${x} ${y + H} ${x} ${y + H - r}`,        // ⌐ bottom-left corner
                `V ${y + r}`,                                // ↑ left side
                `Q ${x} ${y} ${x + r} ${y}`,                // ⌐ top-left corner
                `H ${cx}`,                                   // → back to top-center
            ].join(" ");
        }

        function sizePath() {
            const w = el.offsetWidth;
            const h = el.offsetHeight;

            svg.setAttribute("width",   String(w));
            svg.setAttribute("height",  String(h));
            svg.setAttribute("viewBox", `0 0 ${w} ${h}`);

            const r = Math.min(radius, w / 2 - strokeWidth, h / 2 - strokeWidth);
            path.setAttribute("d", buildPath(w, h, Math.max(r, 0)));
        }

        sizePath();

        // ── animation ──────────────────────────────────────────────────────
        let raf = null;
        let animStart = null;
        let animFrom = 1;
        let animTo = 1;

        function animate(ts) {
            if (!animStart) animStart = ts;
            const t = Math.min((ts - animStart) / duration, 1);
            const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            const current = animFrom + (animTo - animFrom) * ease;

            path.style.strokeDashoffset = String(current);
            path.style.opacity = "1";

            if (t < 1) {
                raf = requestAnimationFrame(animate);
            } else {
                raf = null;
                if (animTo >= 1) path.style.opacity = "0";
            }
        }

        function startAnim(to) {
            if (raf) cancelAnimationFrame(raf);
            animFrom = path.style.opacity === "0" ? 1 : parseFloat(path.style.strokeDashoffset);
            animTo = to;
            animStart = null;
            raf = requestAnimationFrame(animate);
        }

        const onEnter = () => startAnim(0);
        const onLeave = () => startAnim(1);

        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);

        const ro = new ResizeObserver(sizePath);
        ro.observe(el);

        return () => {
            if (raf) cancelAnimationFrame(raf);
            el.removeEventListener("mouseenter", onEnter);
            el.removeEventListener("mouseleave", onLeave);
            ro.disconnect();
            svg.remove();
        };
    }, [color, radius, strokeWidth, duration]);

    return ref;
}
