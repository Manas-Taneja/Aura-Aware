import React from "react";

type GlassButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    overlayStyle?: React.CSSProperties;
    specularStyle?: React.CSSProperties;
    contentClassName?: string;
};

export function GlassButton({ children, className = "", overlayStyle, specularStyle, contentClassName = "", ...props }: GlassButtonProps) {
    return (
        <button {...props} className={`glass-button ${className}`.trim()}>
            <div className="glass-filter" />
            <div className="glass-overlay" style={overlayStyle} />
            <div className="glass-specular" style={specularStyle} />
            <div className={`glass-content ${contentClassName}`.trim()}>{children}</div>
        </button>
    );
}

