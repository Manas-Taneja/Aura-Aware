import { GlassButton } from "../components/buttons";
import React, { useMemo, useState } from "react";
import type { Route } from "./+types/knowledge";
import {
	knowledgeArticles,
	knowledgeCategories,
} from "../knowledge/data";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Knowledge Center • Aura Aware" },
		{ name: "description", content: "Browse guides, understand your body, and healthy habits." },
	];
}

export default function Knowledge() {
	const [query, setQuery] = useState("");
	const [category, setCategory] = useState<string | "all">("all");

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		return knowledgeArticles.filter((a) => {
			const matchesQuery = !q
				|| a.title.toLowerCase().includes(q)
				|| a.excerpt.toLowerCase().includes(q);
			const matchesCategory = category === "all" || a.category === category;
			return matchesQuery && matchesCategory;
		});
	}, [query, category]);

	return (
		<main className="p-4 sm:p-6 mx-auto max-w-xl sm:max-w-4xl overflow-hidden">
			<header className="mb-6">
				<h1 className="text-2xl font-semibold">Knowledge Center</h1>
				<p className="text-sm text-gray-500">Learn with gentle, clear guides</p>
			</header>

			<div className="mb-4 flex flex-col sm:flex-row gap-3">
				<div className="flex-1">
					<div className="glass-search">
						<div className="glass-filter" />
						<div className="glass-overlay" />
						<div className="glass-specular" />
						<div className="glass-content">
							<div className="search-container">
								<i className="fas fa-search search-icon" />
								<input
									value={query}
									onChange={(e) => setQuery(e.target.value)}
									placeholder="Search topics..."
									className="search-input"
								/>
								<button
									type="button"
									aria-label="Clear search"
									className="search-clear"
									onClick={() => setQuery("")}
								>
									<i className="fas fa-times" />
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="w-full sm:w-auto">
					<div className="glass-dropdown-list">
						<div className="glass-dropdown">
							<input type="checkbox" id="knowledge-category-dropdown" className="dropdown-toggle" />
							<label htmlFor="knowledge-category-dropdown" className="dropdown-header">
								<div className="glass-filter" />
								<div className="glass-overlay" />
								<div className="glass-specular" />
								<div className="glass-content">
									<span>{category === "all" ? "All categories" : (category as string)}</span>
									<svg className="dropdown-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
										<path d="M19 9l-7 7-7-7" />
									</svg>
								</div>
							</label>
							<div className="dropdown-content">
								<div className="glass-filter" />
								<div className="glass-overlay" />
								<div className="glass-specular" />
								<div className="glass-content">
									<ul>
                                        <li>
                                            <GlassButton type="button" onClick={() => setCategory("all" as any)} className="w-full text-left">
                                                <span>All categories</span>
                                            </GlassButton>
                                        </li>
										{knowledgeCategories.map((c) => (
											<li key={c}>
                                                <GlassButton type="button" onClick={() => setCategory(c as any)} className="w-full text-left">
                                                    <span>{c}</span>
                                                </GlassButton>
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				{filtered.map((a) => (
					<a key={a.id} href={`/knowledge/${a.slug}`} className="glass-card transition">
						<div className="glass-filter" />
						<div className="glass-overlay" />
						<div className="glass-specular" />
						<div className="glass-content">
							<p className="text-xs uppercase tracking-wide text-white/70 mb-1">{a.category}</p>
							<h3 className="text-base font-medium mb-1">{a.title}</h3>
							<p className="text-sm text-white/90">{a.excerpt}</p>
						</div>
					</a>
				))}
				{filtered.length === 0 && (
					<p className="text-sm text-gray-500">No articles match your search.</p>
				)}
			</div>
		</main>
	);
}

