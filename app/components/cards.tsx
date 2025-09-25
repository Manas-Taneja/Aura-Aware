import React from "react";

type GlassCardProps = {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
};

export function GlassCard({ children, className = "", style }: GlassCardProps) {
    return (
        <div className={`glass-card ${className}`.trim()} style={style}>
            <div className="glass-filter" />
            <div className="glass-overlay" />
            <div className="glass-specular" />
            <div className="glass-content">{children}</div>
        </div>
    );
}

type GlassCardLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    children: React.ReactNode;
    className?: string;
};

export function GlassCardLink({ children, className = "", ...props }: GlassCardLinkProps) {
    return (
        <a {...props} className={`glass-card ${className}`.trim()}>
            <div className="glass-filter" />
            <div className="glass-overlay" />
            <div className="glass-specular" />
            <div className="glass-content">{children}</div>
        </a>
    );
}

