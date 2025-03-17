"use client";

const PlaceholderMap = () => {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 800 400"
            style={{
                backgroundColor: '#f1e8f7',
            }}
        >
            {/* Grid lines */}
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="#e0d1eb"
                    strokeWidth="1"
                />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Roads */}
            <path
                d="M 0 200 H 800 M 400 0 V 400"
                stroke="#fff"
                strokeWidth="20"
                strokeLinecap="round"
            />
            <path
                d="M 0 200 H 800 M 400 0 V 400"
                stroke="#d8c5e8"
                strokeWidth="2"
                strokeDasharray="10,10"
            />

            {/* Location marker */}
            <circle
                cx="400"
                cy="200"
                r="20"
                fill="#6F1AB1"
                opacity="0.2"
            />
            <circle
                cx="400"
                cy="200"
                r="10"
                fill="#6F1AB1"
            />

            {/* Buildings */}
            {[...Array(10)].map((_, i) => (
                <rect
                    key={i}
                    x={100 + i * 60}
                    y={100}
                    width="40"
                    height="40"
                    fill="#6F1AB1"
                    opacity="0.1"
                />
            ))}
            {[...Array(10)].map((_, i) => (
                <rect
                    key={i}
                    x={100 + i * 60}
                    y={260}
                    width="40"
                    height="40"
                    fill="#6F1AB1"
                    opacity="0.1"
                />
            ))}

            {/* Map placeholder text */}
            <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fill="#6F1AB1"
                opacity="0.3"
                style={{
                    fontSize: '24px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 'bold'
                }}
            >
                Map Coming Soon
            </text>
        </svg>
    );
};

export default PlaceholderMap;
