import React, { useEffect, useMemo, useState } from "react";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
		{ title: "Today Hub • Aura Aware" },
		{
			name: "description",
			content:
				"Your daily dashboard with monthly check-in, reminders, tips and quick logs.",
		},
	];
}

type QuickLogType = "feeling_good" | "tenderness" | "fatigue" | "note";

function getTipOfTheDay(): string {
	const tips: string[] = [
		"Know your normal: regular self-awareness helps notice changes early.",
		"Support your body: balanced meals, hydration, and gentle movement help.",
		"Wear comfort-first: choose supportive, comfortable bras and fabrics.",
		"Track patterns: logging symptoms can reveal helpful monthly trends.",
		"Rest matters: prioritize sleep to support overall breast health.",
		"Be kind to yourself: small steps count toward long-term wellbeing.",
		"If something feels off, note it and check again in a few days.",
	];
	const dayIndex = new Date().getDate() % tips.length;
	return tips[dayIndex];
}

function addMonths(date: Date, months: number): Date {
	const d = new Date(date);
	const targetMonth = d.getMonth() + months;
	d.setMonth(targetMonth);
	return d;
}

function startOfDay(date: Date): Date {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function daysBetween(a: Date, b: Date): number {
	const msPerDay = 24 * 60 * 60 * 1000;
	return Math.ceil((startOfDay(b).getTime() - startOfDay(a).getTime()) / msPerDay);
}

export default function Home() {
	const [lastCheckinISO, setLastCheckinISO] = useState<string | null>(null);
	const [toast, setToast] = useState<string | null>(null);

	useEffect(() => {
		try {
			const stored = localStorage.getItem("lastMonthlyCheckin");
			if (stored) setLastCheckinISO(stored);
		} catch {}
	}, []);

	const { isCompletedThisMonth, daysUntilNextDue, dueText } = useMemo(() => {
		const now = new Date();
		const last = lastCheckinISO ? new Date(lastCheckinISO) : null;
		const completedThisMonth =
			last !== null &&
			last.getFullYear() === now.getFullYear() &&
			last.getMonth() === now.getMonth();

		let daysLeft: number | null = null;
		if (last) {
			const nextDue = addMonths(last, 1);
			daysLeft = Math.max(0, daysBetween(now, nextDue));
		}

		const dueLabel = !last
			? "Due now"
			: daysLeft === 0
			? "Due now"
			: `Due in ${daysLeft} day${daysLeft === 1 ? "" : "s"}`;

		return {
			isCompletedThisMonth: completedThisMonth,
			daysUntilNextDue: daysLeft,
			dueText: dueLabel,
		};
	}, [lastCheckinISO]);

	function handleStartMonthlyCheckin() {
		const now = new Date().toISOString();
		try {
			localStorage.setItem("lastMonthlyCheckin", now);
			setLastCheckinISO(now);
			setToast("Monthly check-in started. Redirecting...");
			setTimeout(() => setToast(null), 1500);
			window.location.href = "/checkin";
		} catch {}
	}

	function handleQuickLog(type: QuickLogType) {
		try {
			const existingRaw = localStorage.getItem("quickLogs");
			const existing = existingRaw ? JSON.parse(existingRaw) : [];
			existing.push({ id: crypto.randomUUID(), type, at: new Date().toISOString() });
			localStorage.setItem("quickLogs", JSON.stringify(existing));
			setToast("Logged to Body Journal");
			setTimeout(() => setToast(null), 2000);
		} catch {}
	}

	return (
		<main className="min-h-dvh p-4 sm:p-6 mx-auto max-w-xl sm:max-w-3xl">
			<section className="flex items-center justify-between mb-4 sm:mb-6">
				<div>
					<h1 className="text-2xl font-semibold">Today Hub</h1>
					<p className="text-sm text-gray-500">Your daily snapshot</p>
				</div>
				<div className="text-right">
					<p className="text-xs uppercase tracking-wide text-gray-500">Next Check-in</p>
					<p className="text-sm font-medium">{dueText}</p>
				</div>
			</section>

			{/* CTA Card */}
			<section className="mb-4 sm:mb-6">
				<div className="glass-card">
					<div className="glass-filter" />
					<div className="glass-overlay" />
					<div className="glass-specular" />
					<div className="glass-content">
						<div className="w-full flex items-start justify-between gap-4">
							<div>
								<h2 className="text-lg font-medium mb-1">Start Your Monthly Check-in</h2>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									Complete a quick monthly review to stay on top of changes.
								</p>
							</div>
							{isCompletedThisMonth ? (
								<button disabled className="glass-button inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed">
									<div className="glass-content">Check-in Completed</div>
								</button>
							) : (
								<button onClick={handleStartMonthlyCheckin} className="glass-button inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium">
									<div className="glass-content">Start Your Monthly Check-in</div>
								</button>
							)}
						</div>
					</div>
				</div>
			</section>

			{/* Tip of the Day */}
			<section className="mb-4 sm:mb-6">
				<div className="glass-card">
					<div className="glass-filter" />
					<div className="glass-overlay" />
					<div className="glass-specular" />
					<div className="glass-content">
						<p className="text-xs uppercase tracking-wide text-white/80 mb-2">Tip of the Day</p>
						<p className="text-sm leading-relaxed text-white/90">{getTipOfTheDay()}</p>
					</div>
				</div>
			</section>

			{/* Quick Log */}
			<section>
				<div className="glass-card">
					<div className="glass-filter" />
					<div className="glass-overlay" />
					<div className="glass-specular" />
					<div className="glass-content">
						<div className="w-full flex items-center justify-between mb-3">
							<h2 className="text-lg font-medium">Quick Log</h2>
							<p className="text-xs text-white/70">Fast-track to your Body Journal</p>
						</div>
						<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
							<button onClick={() => handleQuickLog("feeling_good")} className="glass-button group rounded-lg p-0 transition text-center">
								<div className="glass-content p-4">
									<div className="text-2xl mb-2">😊</div>
									<div className="text-sm font-medium">Feeling good</div>
								</div>
							</button>
							<button onClick={() => handleQuickLog("tenderness")} className="glass-button group rounded-lg p-0 transition text-center">
								<div className="glass-content p-4">
									<div className="text-2xl mb-2">💧</div>
									<div className="text-sm font-medium">Tenderness</div>
								</div>
							</button>
							<button onClick={() => handleQuickLog("fatigue")} className="glass-button group rounded-lg p-0 transition text-center">
								<div className="glass-content p-4">
									<div className="text-2xl mb-2">🌙</div>
									<div className="text-sm font-medium">Fatigue</div>
								</div>
							</button>
							<button onClick={() => handleQuickLog("note")} className="glass-button group rounded-lg p-0 transition text-center">
								<div className="glass-content p-4">
									<div className="text-2xl mb-2">📝</div>
									<div className="text-sm font-medium">Add a note</div>
								</div>
							</button>
						</div>
						<p className="text-xs text-white/70 mt-3">
							These quick logs are saved instantly. View and edit them in your Body Journal.
						</p>
					</div>
				</div>
			</section>

			{/* Toast */}
			{toast && (
				<div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
					<div className="rounded-full bg-gray-900 text-white text-sm px-4 py-2 shadow-lg">
						{toast}
					</div>
				</div>
			)}
		</main>
	);
}
