import type { Config } from "tailwindcss";

// all in fixtures is set to tailwind v3 as interims solutions

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'wave-letter': {
  				'0%, 100%': {
  					transform: 'translateY(0px) scale(1) rotateZ(0deg)',
  					'text-shadow': '0 0 10px rgba(147, 51, 234, 0.3)'
  				},
  				'25%': {
  					transform: 'translateY(-10px) scale(1.05) rotateZ(2deg)',
  					'text-shadow': '0 0 20px rgba(59, 130, 246, 0.5)'
  				},
  				'50%': {
  					transform: 'translateY(-5px) scale(1.1) rotateZ(-1deg)',
  					'text-shadow': '0 0 25px rgba(16, 185, 129, 0.6)'
  				},
  				'75%': {
  					transform: 'translateY(-15px) scale(1.03) rotateZ(1deg)',
  					'text-shadow': '0 0 15px rgba(236, 72, 153, 0.4)'
  				}
  			},
  			'float-particle': {
  				'0%, 100%': {
  					transform: 'translateY(0px) translateX(0px) scale(1)',
  					opacity: '0.3'
  				},
  				'50%': {
  					transform: 'translateY(-20px) translateX(10px) scale(1.2)',
  					opacity: '0.8'
  				}
  			},
  			'spin-reverse': {
  				from: {
  					transform: 'rotate(360deg)'
  				},
  				to: {
  					transform: 'rotate(0deg)'
  				}
  			},
  			'matrix-text': {
  				'0%, 100%': {
  					transform: 'translateY(0px) scale(1)',
  					filter: 'brightness(1) blur(0px)'
  				},
  				'50%': {
  					transform: 'translateY(-5px) scale(1.05)',
  					filter: 'brightness(1.3) blur(0.5px)'
  				}
  			},
  			'progress-bar': {
  				'0%': {
  					width: '0%',
  					transform: 'translateX(-100%)'
  				},
  				'50%': {
  					width: '80%',
  					transform: 'translateX(0%)'
  				},
  				'100%': {
  					width: '99%',
  					transform: 'translateX(0%)'
  				}
  			},
  			'pulse-slow': {
  				'0%, 100%': {
  					opacity: '0.7'
  				},
  				'50%': {
  					opacity: '1'
  				}
  			},
  			'sweep': {
  				'0%': {
  					transform: 'translateX(-200px) rotate(45deg)',
  					opacity: '0'
  				},
  				'50%': {
  					opacity: '1'
  				},
  				'100%': {
  					transform: 'translateX(200px) rotate(45deg)',
  					opacity: '0'
  				}
  			},
  			'float-orb': {
  				'0%, 100%': {
  					transform: 'translateY(0px) scale(1)',
  					opacity: '0.3'
  				},
  				'50%': {
  					transform: 'translateY(-30px) scale(1.1)',
  					opacity: '0.6'
  				}
  			},
  			'dna-helix': {
  				'0%': {
  					transform: 'rotateY(0deg) translateX(80px)'
  				},
  				'100%': {
  					transform: 'rotateY(360deg) translateX(80px)'
  				}
  			},
  			'pulse-core': {
  				'0%, 100%': {
  					transform: 'scale(1)',
  					opacity: '1'
  				},
  				'50%': {
  					transform: 'scale(1.2)',
  					opacity: '0.8'
  				}
  			},
  			'orbit': {
  				'0%': {
  					transform: 'rotate(0deg)'
  				},
  				'100%': {
  					transform: 'rotate(360deg)'
  				}
  			},
  			'twinkle': {
  				'0%, 100%': {
  					opacity: '0.3',
  					transform: 'scale(1)'
  				},
  				'50%': {
  					opacity: '1',
  					transform: 'scale(1.3)'
  				}
  			},
  			'scan': {
  				'0%': {
  					transform: 'translateX(-100%)'
  				},
  				'100%': {
  					transform: 'translateX(100%)'
  				}
  			},
  			'scan-reverse': {
  				'0%': {
  					transform: 'translateX(100%)'
  				},
  				'100%': {
  					transform: 'translateX(-100%)'
  				}
  			},
  			'type-writer': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			'cursor': {
  				'0%, 100%': {
  					opacity: '1'
  				},
  				'50%': {
  					opacity: '0'
  				}
  			},
  			'slide-up': {
  				'0%': {
  					transform: 'translateY(100%)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateY(0)',
  					opacity: '1'
  				}
  			},
  			'glow': {
  				'0%, 100%': {
  					textShadow: '0 0 5px rgba(34, 211, 238, 0.5)'
  				},
  				'50%': {
  					textShadow: '0 0 20px rgba(34, 211, 238, 0.8)'
  				}
  			},
  			'counting': {
  				'0%': {
  					content: '"0%"'
  				},
  				'100%': {
  					content: '"99%"'
  				}
  			},
  			'wave': {
  				'0%': {
  					transform: 'translateX(-100%)'
  				},
  				'50%': {
  					transform: 'translateX(0%)'
  				},
  				'100%': {
  					transform: 'translateX(100%)'
  				}
  			},
  			'shimmer': {
  				'0%': {
  					transform: 'translateX(-100%)'
  				},
  				'100%': {
  					transform: 'translateX(100%)'
  				}
  			},
  			'fade-in-out': {
  				'0%, 100%': {
  					opacity: '0.5'
  				},
  				'50%': {
  					opacity: '1'
  				}
  			},
  			'tech-glow': {
  				'0%, 100%': {
  					boxShadow: '0 0 5px rgba(34, 211, 238, 0.3)'
  				},
  				'50%': {
  					boxShadow: '0 0 20px rgba(34, 211, 238, 0.6)'
  				}
  			},
  			'breathing': {
  				'0%, 100%': {
  					opacity: '0.7',
  					transform: 'scale(1)'
  				},
  				'50%': {
  					opacity: '1',
  					transform: 'scale(1.02)'
  				}
  			},
  			'wave-dots': {
  				'0%, 100%': {
  					transform: 'translateY(0) scale(1)'
  				},
  				'50%': {
  					transform: 'translateY(-10px) scale(1.2)'
  				}
  			},
  			'loading-text': {
  				'0%, 100%': {
  					opacity: '0.6'
  				},
  				'50%': {
  					opacity: '1'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'wave-letter': 'wave-letter 2s ease-in-out infinite',
  			'float-particle': 'float-particle 3s ease-in-out infinite',
  			'spin-reverse': 'spin-reverse 2s linear infinite',
  			'matrix-text': 'matrix-text 2s ease-in-out infinite',
  			'progress-bar': 'progress-bar 2.5s ease-out',
  			'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
  			'sweep': 'sweep 3s ease-in-out infinite',
  			'float-orb': 'float-orb 4s ease-in-out infinite',
  			'dna-helix': 'dna-helix 3s linear infinite',
  			'pulse-core': 'pulse-core 2s ease-in-out infinite',
  			'orbit': 'orbit 4s linear infinite',
  			'twinkle': 'twinkle 2s ease-in-out infinite',
  			'scan': 'scan 2s linear infinite',
  			'scan-reverse': 'scan-reverse 2s linear infinite reverse',
  			'type-writer': 'type-writer 0.5s ease-out forwards',
  			'cursor': 'cursor 1s ease-in-out infinite',
  			'slide-up': 'slide-up 1s ease-out 1.5s forwards',
  			'glow': 'glow 2s ease-in-out infinite',
  			'counting': 'counting 2.5s ease-out',
  			'wave': 'wave 3s ease-in-out infinite',
  			'shimmer': 'shimmer 2s ease-in-out infinite',
  			'fade-in-out': 'fade-in-out 3s ease-in-out infinite',
  			'tech-glow': 'tech-glow 2s ease-in-out infinite',
  			'breathing': 'breathing 4s ease-in-out infinite',
  			'wave-dots': 'wave-dots 1.5s ease-in-out infinite',
  			'loading-text': 'loading-text 2s ease-in-out infinite'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
