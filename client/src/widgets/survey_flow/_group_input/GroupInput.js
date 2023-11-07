import React from "react";

function GroupInput({ children }) {
    // Inline style for a column layout
    const columnStyle = {
        display: 'flex', // Use 'flex' display to enable flexbox properties
        flexDirection: 'column', // Stack children vertically
        gap: '10px', // Optional: adds space between child components
    };

    return (
        <div style={columnStyle}>
            {children}
        </div>
    );
}

export default GroupInput;
