import React from 'react';

const HeroIllustration = () => {
  return (
    <div className="hero-illustration" style={{ opacity: 0.7 }}>
      <svg
        width="100%"
        height="200"
        viewBox="0 0 1200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ 
          filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))',
          maxWidth: '1200px'
        }}
      >
        {/* House 1 */}
        <g transform="translate(50, 40)">
          <path
            d="M0 80L40 40L80 80V140H0V80Z"
            fill="#e75d7c"
            opacity="0.2"
          />
          <rect x="30" y="100" width="20" height="40" fill="#e75d7c" opacity="0.3" />
          <rect x="10" y="90" width="15" height="15" fill="#e75d7c" opacity="0.3" />
        </g>

        {/* Furniture Group */}
        <g transform="translate(150, 60)">
          <rect x="0" y="40" width="60" height="40" rx="5" fill="#e75d7c" opacity="0.2" />
          <rect x="70" y="30" width="30" height="50" rx="5" fill="#e75d7c" opacity="0.15" />
          <rect x="110" y="45" width="40" height="35" rx="5" fill="#e75d7c" opacity="0.25" />
        </g>

        {/* House 2 */}
        <g transform="translate(350, 30)">
          <path
            d="M0 90L50 40L100 90V160H0V90Z"
            fill="#e75d7c"
            opacity="0.15"
          />
          <rect x="40" y="110" width="25" height="50" fill="#e75d7c" opacity="0.25" />
        </g>

        {/* Moving Boxes - Adjusted position */}
        <g transform="translate(500, 70)">
          <rect x="0" y="0" width="40" height="40" fill="#e75d7c" opacity="0.15" />
          <rect x="10" y="10" width="40" height="40" fill="#e75d7c" opacity="0.2" />
          <rect x="20" y="20" width="40" height="40" fill="#e75d7c" opacity="0.25" />
        </g>

        {/* House 3 - Adjusted position */}
        <g transform="translate(650, 45)">
          <path
            d="M0 70L45 30L90 70V130H0V70Z"
            fill="#e75d7c"
            opacity="0.2"
          />
          <rect x="35" y="90" width="22" height="40" fill="#e75d7c" opacity="0.3" />
          <rect x="15" y="80" width="12" height="12" fill="#e75d7c" opacity="0.3" />
        </g>

        {/* Car - Adjusted position */}
        <g transform="translate(800, 80)">
          <path
            d="M0 30L10 10H70L80 30V50H0V30Z"
            fill="#e75d7c"
            opacity="0.2"
          />
          <circle cx="20" cy="50" r="10" fill="#e75d7c" opacity="0.3" />
          <circle cx="60" cy="50" r="10" fill="#e75d7c" opacity="0.3" />
        </g>

        {/* House 4 - Adjusted position */}
        <g transform="translate(930, 35)">
          <path
            d="M0 80L40 40L80 80V140H0V80Z"
            fill="#e75d7c"
            opacity="0.15"
          />
          <rect x="30" y="100" width="20" height="40" fill="#e75d7c" opacity="0.25" />
        </g>
      </svg>
    </div>
  );
};

export default HeroIllustration;
