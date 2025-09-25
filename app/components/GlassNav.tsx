import { NavLink } from "react-router";

export function GlassNav() {
    return (
        <nav className="glass-nav mx-auto w-full">
            <div className="glass-card" style={{ display: "inline-block" }}>
                <div className="glass-filter" />
                <div className="glass-overlay" />
                <div className="glass-specular" />
                <div className="glass-content" style={{ padding: 8 }}>
                    <div className="glass-icons-grid">
                    {/* Home */}
                    <NavLink to="/" className={({ isActive }) => `glass-icon${isActive ? " active" : ""}`}>
                        <div className="glass-filter" />
                        <div className="glass-overlay" />
                        <div className="glass-specular" />
                        <div className="glass-content">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                            </svg>
                        </div>
                    </NavLink>
                    {/* Check-in */}
                    <NavLink to="/checkin" className={({ isActive }) => `glass-icon${isActive ? " active" : ""}`}>
                        <div className="glass-filter" />
                        <div className="glass-overlay" />
                        <div className="glass-specular" />
                        <div className="glass-content">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 12l2 2 4-4" />
                                <rect x="3" y="4" width="18" height="16" rx="2" ry="2" />
                            </svg>
                        </div>
                    </NavLink>
                    {/* Timeline */}
                    <NavLink to="/timeline" className={({ isActive }) => `glass-icon${isActive ? " active" : ""}`}>
                        <div className="glass-filter" />
                        <div className="glass-overlay" />
                        <div className="glass-specular" />
                        <div className="glass-content">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="9" />
                                <path d="M12 7v5l3 3" />
                            </svg>
                        </div>
                    </NavLink>
                    {/* Knowledge */}
                    <NavLink to="/knowledge" className={({ isActive }) => `glass-icon${isActive ? " active" : ""}`}>
                        <div className="glass-filter" />
                        <div className="glass-overlay" />
                        <div className="glass-specular" />
                        <div className="glass-content">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                                <path d="M20 22V6a2 2 0 00-2-2H7a3 3 0 00-3 3v12" />
                            </svg>
                        </div>
                    </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
}

