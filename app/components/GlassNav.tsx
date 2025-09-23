import { NavLink } from "react-router";

export function GlassNav() {
	return (
		<nav className="glass-nav mx-auto mt-4 w-full">
			<div className="glass-filter" />
			<div className="glass-overlay" />
			<div className="glass-specular" />
			<div className="glass-content">
				<div className="glass-icons-grid">
					<NavLink to="/" className="glass-icon" aria-label="Home">
						<div className="glass-filter" />
						<div className="glass-overlay" />
						<div className="glass-specular" />
						<div className="glass-content">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
								<path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
							</svg>
						</div>
					</NavLink>
					<NavLink to="/checkin" className="glass-icon" aria-label="Check-in">
						<div className="glass-filter" />
						<div className="glass-overlay" />
						<div className="glass-specular" />
						<div className="glass-content">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
								<path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
							</svg>
						</div>
					</NavLink>
					<NavLink to="/timeline" className="glass-icon" aria-label="Timeline">
						<div className="glass-filter" />
						<div className="glass-overlay" />
						<div className="glass-specular" />
						<div className="glass-content">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
								<path d="M8 7v10M12 5v14M16 9v6"/>
							</svg>
						</div>
					</NavLink>
					<NavLink to="/knowledge" className="glass-icon" aria-label="Knowledge">
						<div className="glass-filter" />
						<div className="glass-overlay" />
						<div className="glass-specular" />
						<div className="glass-content">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
								<path d="M12 20l9-5-9-5-9 5 9 5z"/>
								<path d="M12 12l9-5-9-5-9 5 9 5z"/>
							</svg>
						</div>
					</NavLink>
				</div>
			</div>
		</nav>
	);
}

