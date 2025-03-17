'use client';

import dynamic from 'next/dynamic';
import styles from '../app/home.module.css';

// Dynamically import Lottie with no SSR
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

// Import animation data
const houseAnimation = {
  "v": "5.7.4",
  "fr": 30,
  "ip": 0,
  "op": 90,
  "w": 500,
  "h": 500,
  "nm": "House Animation",
  "ddd": 0,
  "assets": [],
  "layers": [
    {
      "ddd": 0,
      "ind": 1,
      "ty": 4,
      "nm": "House",
      "sr": 1,
      "ks": {
        "o": {
          "a": 0,
          "k": 100,
          "ix": 11
        },
        "r": {
          "a": 0,
          "k": 0,
          "ix": 10
        },
        "p": {
          "a": 1,
          "k": [
            {
              "i": {"x": 0.667, "y": 1},
              "o": {"x": 0.333, "y": 0},
              "t": 0,
              "s": [250, 270, 0],
              "to": [0, -5, 0],
              "ti": [0, 0, 0]
            },
            {
              "i": {"x": 0.667, "y": 1},
              "o": {"x": 0.333, "y": 0},
              "t": 45,
              "s": [250, 240, 0],
              "to": [0, 0, 0],
              "ti": [0, -5, 0]
            },
            {
              "t": 89,
              "s": [250, 270, 0]
            }
          ],
          "ix": 2
        },
        "a": {
          "a": 0,
          "k": [0, 0, 0],
          "ix": 1
        },
        "s": {
          "a": 0,
          "k": [100, 100, 100],
          "ix": 6
        }
      },
      "ao": 0,
      "shapes": [
        {
          "ty": "gr",
          "it": [
            {
              "ty": "rc",
              "d": 1,
              "s": {"a": 0, "k": [160, 120]},
              "p": {"a": 0, "k": [0, 20]},
              "r": {"a": 0, "k": 8},
              "nm": "Base",
              "mn": "ADBE Vector Shape - Rect",
              "hd": false
            },
            {
              "ty": "fl",
              "c": {"a": 0, "k": [0.435, 0.102, 0.694]},
              "o": {"a": 0, "k": 100},
              "r": 1,
              "nm": "Fill",
              "mn": "ADBE Vector Graphic - Fill",
              "hd": false
            }
          ],
          "nm": "House Base",
          "np": 2,
          "cix": 2,
          "bm": 0,
          "ix": 1,
          "mn": "ADBE Vector Group",
          "hd": false
        },
        {
          "ty": "gr",
          "it": [
            {
              "ty": "sh",
              "ix": 1,
              "ks": {
                "a": 0,
                "k": {
                  "i": [[0,0], [0,0], [0,0]],
                  "o": [[0,0], [0,0], [0,0]],
                  "v": [[-90,-40], [0,-100], [90,-40]],
                  "c": true
                }
              },
              "nm": "Roof",
              "mn": "ADBE Vector Shape - Path",
              "hd": false
            },
            {
              "ty": "fl",
              "c": {"a": 0, "k": [0.435, 0.102, 0.694]},
              "o": {"a": 0, "k": 100},
              "r": 1,
              "nm": "Fill",
              "mn": "ADBE Vector Graphic - Fill",
              "hd": false
            }
          ],
          "nm": "Roof",
          "np": 2,
          "cix": 2,
          "bm": 0,
          "ix": 2,
          "mn": "ADBE Vector Group",
          "hd": false
        }
      ],
      "ip": 0,
      "op": 90,
      "st": 0,
      "bm": 0
    }
  ],
  "markers": []
};

export default function HeroAnimation() {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      width: '100%',
      height: '400px',
      background: 'var(--light-pink)',
      borderRadius: '16px'
    }}>
      <svg 
        width="200" 
        height="200" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="var(--primary-pink)" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
    </div>
  );
}
