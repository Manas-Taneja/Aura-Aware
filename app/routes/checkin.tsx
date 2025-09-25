import { GlassButton } from "../components/buttons";
import React, { useMemo, useState } from "react";
import type { Route } from "./+types/checkin";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Check-in • Aura Aware" },
		{ name: "description", content: "Guided monthly check-in and body journal." },
	];
}

type SymptomKey = "tenderness" | "swelling" | "pain" | "normal";

type StepKey = 1 | 2 | 3;

const quadrantLabels = [
	"Upper-left quadrant",
	"Upper-right quadrant",
	"Lower-left quadrant",
	"Lower-right quadrant",
];

export default function Checkin() {
	const [step, setStep] = useState<StepKey>(1);
	const [selectedSymptoms, setSelectedSymptoms] = useState<
		Record<SymptomKey, boolean>
	>({ tenderness: false, swelling: false, pain: false, normal: false });
	const [notes, setNotes] = useState("");
	const [quadrantIndex, setQuadrantIndex] = useState(0);

	const canContinueFromStep1 = useMemo(() => {
		return (
			Object.values(selectedSymptoms).some(Boolean) || notes.trim().length > 0
		);
	}, [selectedSymptoms, notes]);

	function toggleSymptom(key: SymptomKey) {
		setSelectedSymptoms((prev) => ({ ...prev, [key]: !prev[key] }));
	}

	function nextFromStep1() {
		if (!canContinueFromStep1) return;
		setStep(2);
	}

	function nextQuadrant() {
		if (quadrantIndex < quadrantLabels.length - 1) {
			setQuadrantIndex((i) => i + 1);
		} else {
			setStep(3);
		}
	}

	const simulatedResult: "clear" | "concern" = useMemo(() => {
		// Simple simulation: if any symptom except normal is selected, show concern
		const hasConcern =
			selectedSymptoms.tenderness || selectedSymptoms.swelling || selectedSymptoms.pain;
		return hasConcern ? "concern" : "clear";
	}, [selectedSymptoms]);

	function finishCheckin() {
		try {
			const payload = {
				completedAt: new Date().toISOString(),
				symptoms: selectedSymptoms,
				notes: notes.trim(),
				result: simulatedResult,
			};
			localStorage.setItem("lastMonthlyCheckin", payload.completedAt);
			const historyRaw = localStorage.getItem("checkinHistory");
			const history = historyRaw ? JSON.parse(historyRaw) : [];
			history.push(payload);
			localStorage.setItem("checkinHistory", JSON.stringify(history));
		} catch {}
	}

	return (
		<main className="p-4 sm:p-6 mx-auto max-w-xl sm:max-w-3xl overflow-hidden">
			<header className="mb-6">
				<h1 className="text-2xl font-semibold">Monthly Check-in</h1>
				<p className="text-sm text-gray-500">Step {step} of 3</p>
			</header>

			{step === 1 && (
				<section className="glass-card">
					<div className="glass-filter" />
					<div className="glass-overlay" />
					<div className="glass-specular" />
					<div className="glass-content">
					<h2 className="text-lg font-medium mb-3">How are you feeling today?</h2>
					<div className="w-full max-w-md sm:max-w-none grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 auto-rows-fr">
                    <GlassButton type="button" onClick={() => toggleSymptom("tenderness")} className="w-full h-full" aria-pressed={selectedSymptoms.tenderness}
                        overlayStyle={selectedSymptoms.tenderness ? { background: "rgba(255, 255, 255, 0.35)" } : undefined}
                        specularStyle={selectedSymptoms.tenderness ? { boxShadow: "inset 1px 1px 1px rgba(255,255,255,0.9)" } : undefined}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'none'; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'none'; }}
                        onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'none'; }}
                        onMouseUp={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'none'; }}
                        onTouchStart={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'none'; }}
                        onTouchEnd={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'none'; }}
                    >
                        <div className="p-4 flex flex-col items-center justify-center">
                            <div className="text-3xl mb-2">💧</div>
                            <div className="text-sm font-medium">Tenderness</div>
                        </div>
                    </GlassButton>
                    <GlassButton type="button" onClick={() => toggleSymptom("swelling")} className="w-full h-full" aria-pressed={selectedSymptoms.swelling}
                        overlayStyle={selectedSymptoms.swelling ? { background: "rgba(255, 255, 255, 0.35)" } : undefined}
                        specularStyle={selectedSymptoms.swelling ? { boxShadow: "inset 1px 1px 1px rgba(255,255,255,0.9)" } : undefined}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'none'; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'none'; }}
                        onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'none'; }}
                        onMouseUp={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'none'; }}
                        onTouchStart={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'none'; }}
                        onTouchEnd={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'none'; }}
                    >
                        <div className="p-4 flex flex-col items-center justify-center">
                            <div className="text-3xl mb-2">💠</div>
                            <div className="text-sm font-medium">Swelling</div>
                        </div>
                    </GlassButton>
                    <GlassButton type="button" onClick={() => toggleSymptom("pain")} className="w-full h-full" aria-pressed={selectedSymptoms.pain}
                        overlayStyle={selectedSymptoms.pain ? { background: "rgba(255, 255, 255, 0.35)" } : undefined}
                        specularStyle={selectedSymptoms.pain ? { boxShadow: "inset 1px 1px 1px rgba(255,255,255,0.9)" } : undefined}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'none'; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'none'; }}
                        onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'none'; }}
                        onMouseUp={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'none'; }}
                        onTouchStart={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'none'; }}
                        onTouchEnd={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'none'; }}
                    >
                        <div className="p-4 flex flex-col items-center justify-center">
                            <div className="text-3xl mb-2">⚡</div>
                            <div className="text-sm font-medium">Pain</div>
                        </div>
                    </GlassButton>
                    <GlassButton type="button" onClick={() => toggleSymptom("normal")} className="w-full h-full" aria-pressed={selectedSymptoms.normal}
                        overlayStyle={selectedSymptoms.normal ? { background: "rgba(255, 255, 255, 0.35)" } : undefined}
                        specularStyle={selectedSymptoms.normal ? { boxShadow: "inset 1px 1px 1px rgba(255,255,255,0.9)" } : undefined}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'none'; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'none'; }}
                        onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'none'; }}
                        onMouseUp={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'none'; }}
                        onTouchStart={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'none'; }}
                        onTouchEnd={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'none'; }}
                    >
                        <div className="p-4 flex flex-col items-center justify-center">
                            <div className="text-3xl mb-2">✅</div>
                            <div className="text-sm font-medium">Normal</div>
                        </div>
                    </GlassButton>
					</div>
                    <label className="block mb-1 text-sm font-medium">Notes (optional)</label>
                    <div className="glass-card">
                        <div className="glass-filter" />
                        <div className="glass-overlay" />
                        <div className="glass-specular" />
                        <div className="glass-content p-2">
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                rows={4}
                                placeholder="Anything you want to remember for this check-in..."
                                className="w-full bg-transparent p-3 text-sm resize-none"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <GlassButton onClick={nextFromStep1} disabled={!canContinueFromStep1} className="rounded-lg mt-2 text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed">
                            Next
                        </GlassButton>
                    </div>
					</div>
				</section>
			)}

			{step === 2 && (
				<section className="glass-card">
					<div className="glass-filter" />
					<div className="glass-overlay" />
					<div className="glass-specular" />
					<div className="glass-content">
					<h2 className="text-lg font-medium mb-3">Guided Scan</h2>
					<p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
						Follow the prompts. We’ll highlight each area one at a time.
					</p>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
						<div className="aspect-square rounded-xl border border-gray-200 dark:border-gray-800 grid grid-cols-2 grid-rows-2 overflow-hidden">
							{[0, 1, 2, 3].map((i) => (
								<div
									key={i}
									className={`border border-gray-200 dark:border-gray-800 flex items-center justify-center text-xs ${
										i === quadrantIndex ? "bg-pink-100 dark:bg-pink-950/30" : ""
									}`}
								>
									{i === 0 && "UL"}
									{i === 1 && "UR"}
									{i === 2 && "LL"}
									{i === 3 && "LR"}
								</div>
							))}
						</div>
						<div>
							<p className="text-sm mb-4">
								Scan the <span className="font-medium">{quadrantLabels[quadrantIndex]}</span> now.
							</p>
                            <GlassButton onClick={nextQuadrant} className="rounded-lg px-4 py-2 text-sm font-medium">
                                {quadrantIndex < 3 ? "Next" : "Finish"}
                            </GlassButton>
						</div>
					</div>
					</div>
				</section>
			)}

			{step === 3 && (
				<section className="glass-card">
					<div className="glass-filter" />
					<div className="glass-overlay" />
					<div className="glass-specular" />
					<div className="glass-content">
					<h2 className="text-lg font-medium mb-3">Your check-in is complete!</h2>
					<p className="text-sm mb-4">
						Result: {simulatedResult === "clear" ? "All clear" : "An area of concern was noted"}
					</p>
					<div className="mb-4">
						<p className="text-sm font-medium mb-2">Symptoms logged</p>
						<ul className="text-sm list-disc pl-5 space-y-1">
							{Object.entries(selectedSymptoms)
								.filter(([, v]) => v)
								.map(([k]) => (
									<li key={k}>{k}</li>
								))}
							{notes.trim() && <li>Note: {notes.trim()}</li>}
						</ul>
					</div>
					<div className="flex gap-3">
                        <a href="/" className="glass-button rounded-lg px-4 py-2 text-sm font-medium" onClick={finishCheckin}>
                            <div className="glass-filter" />
                            <div className="glass-overlay" />
                            <div className="glass-specular" />
                            <div className="glass-content">Back to Today Hub</div>
                        </a>
                        <GlassButton onClick={finishCheckin} className="rounded-lg px-4 py-2 text-sm font-medium">
                            Save results
                        </GlassButton>
					</div>
					</div>
				</section>
			)}
		</main>
	);
}

