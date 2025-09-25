import type { Route } from "./+types/knowledge.$slug";
import { findArticleBySlug } from "../knowledge/data";
import { useEffect, useRef, useState } from "react";

export function meta({ params }: Route.MetaArgs) {
	const article = params.slug ? findArticleBySlug(params.slug) : undefined;
	return [
		{ title: article ? `${article.title} • Knowledge Center` : "Article • Knowledge Center" },
	];
}

export default function KnowledgeArticle({ params }: Route.ComponentProps) {
    const article = params.slug ? findArticleBySlug(params.slug) : undefined;
    const mainRef = useRef<HTMLElement | null>(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const el = mainRef.current;
        const log = (tag: string) => {
            try {
                const docW = document.documentElement.clientWidth;
                const winW = window.innerWidth;
                const vvW = (window as any).visualViewport?.width;
                const mainW = el ? el.getBoundingClientRect().width : undefined;
                const maxW = el ? getComputedStyle(el).maxWidth : undefined;
                // eslint-disable-next-line no-console
                console.log("[KnowledgeWidth]", tag, { docW, winW, vvW, mainW, maxW });
            } catch {}
        };
        log("mount");
        requestAnimationFrame(() => {
            setLoaded(true);
            log("raf");
            try {
                if (!el) return;
                const initialW = el.getBoundingClientRect().width;
                setTimeout(() => {
                    try {
                        const afterW = el.getBoundingClientRect().width;
                        const threshold = window.innerWidth * 0.6;
                        if (initialW < threshold && Math.abs(afterW - initialW) < 1) {
                            const prevTransform = el.style.transform;
                            el.style.transform = (prevTransform ? prevTransform + " " : "") + "translateZ(0)";
                            requestAnimationFrame(() => { el.style.transform = prevTransform; });
                        }
                    } catch {}
                }, 0);
            } catch {}
        });
        const onResize = () => log("resize");
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);
	if (!article) {
		return (
			<main className="min-h-dvh p-6 mx-auto max-w-3xl">
				<p className="text-sm text-gray-500">Article not found.</p>
			</main>
		);
	}

    return (
        <main ref={mainRef as any} className={`min-h-dvh p-4 sm:p-6 mx-auto max-w-xl sm:max-w-3xl transition-opacity duration-200 ${loaded ? "opacity-100" : "opacity-0"}`}>
			<a href="/knowledge" className="text-sm text-pink-600 hover:underline">← Back to Knowledge</a>
			<article className="prose dark:prose-invert max-w-none">
				<p className="mt-3 text-xs uppercase tracking-wide text-gray-500">{article.category}</p>
				<h1 className="text-2xl font-semibold mb-2">{article.title}</h1>
				{article.visuals?.length ? (
					<div className="my-4 grid gap-3">
						{article.visuals.map((v, i) => (
							<div key={i} className="rounded-lg border border-gray-200 dark:border-gray-800 p-3">
								<p className="text-sm">{v.type === "diagram" ? "Diagram" : "Video"}: {v.description}</p>
							</div>
						))}
					</div>
				) : null}
				{article.content.map((p, i) => (
					<p key={i} className="text-base leading-relaxed">{p}</p>
				))}
			</article>
		</main>
	);
}

