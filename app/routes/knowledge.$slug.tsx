import type { Route } from "./+types/knowledge.$slug";
import { findArticleBySlug } from "../knowledge/data";

export function meta({ params }: Route.MetaArgs) {
	const article = params.slug ? findArticleBySlug(params.slug) : undefined;
	return [
		{ title: article ? `${article.title} • Knowledge Center` : "Article • Knowledge Center" },
	];
}

export default function KnowledgeArticle({ params }: Route.ComponentProps) {
	const article = params.slug ? findArticleBySlug(params.slug) : undefined;
	if (!article) {
		return (
			<main className="min-h-dvh p-6 mx-auto max-w-3xl">
				<p className="text-sm text-gray-500">Article not found.</p>
			</main>
		);
	}

	return (
		<main className="min-h-dvh p-4 sm:p-6 mx-auto max-w-xl sm:max-w-3xl">
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

