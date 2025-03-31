/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
  	container: {
  		center: true,
  		padding: "2rem",
  		screens: {
  			"2xl": "1400px",
  		},
  	},
  	extend: {
  		colors: {
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			light: '#BEDBFF ',
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
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			"accordion-down": {
  				from: { height: 0 },
  				to: { height: "var(--radix-accordion-content-height)" },
  			},
  			"accordion-up": {
  				from: { height: "var(--radix-accordion-content-height)" },
  				to: { height: 0 },
  			},
  			"float-slow": {
  				"0%, 100%": { transform: "translateY(0) rotate(0)" },
  				"50%": { transform: "translateY(-20px) rotate(5deg)" },
  			},
  			"float-medium": {
  				"0%, 100%": { transform: "translateY(0) rotate(0)" },
  				"50%": { transform: "translateY(-15px) rotate(-5deg)" },
  			},
  			"float-fast": {
  				"0%, 100%": { transform: "translateY(0) rotate(0)" },
  				"50%": { transform: "translateY(-10px) rotate(3deg)" },
  			},
  			"pulse-subtle": {
  				"0%, 100%": { opacity: 1, transform: "scale(1)" },
  				"50%": { opacity: 0.9, transform: "scale(0.98)" },
  			},
  			"gradient-x": {
  				"0%": { backgroundPosition: "0% 50%" },
  				"50%": { backgroundPosition: "100% 50%" },
  				"100%": { backgroundPosition: "0% 50%" },
  			},
  			"reveal-text": {
  				"0%": { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
  				"100%": { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
  			},
  			"line-reveal": {
  				"0%": { width: "0" },
  				"100%": { width: "100%" },
  			},
  			"spotlight": {
  				"0%": { transform: "translate(-50%, -50%) scale(0.5)", opacity: 0 },
  				"100%": { transform: "translate(0%, 0%) scale(1.5)", opacity: 1 },
  			},
  			"scroll-down": {
  				"0%": { transform: "translateY(0)", opacity: 1 },
  				"50%": { transform: "translateY(5px)", opacity: 0.5 },
  				"100%": { transform: "translateY(0)", opacity: 1 },
  			},
  			"slide-in-right": {
  				"0%": { transform: "translateX(100%)", opacity: 0 },
  				"10%": { transform: "translateX(-5%)", opacity: 1 },
  				"20%": { transform: "translateX(0%)" },
  				"80%": { transform: "translateX(0%)" },
  				"90%": { transform: "translateX(-5%)", opacity: 1 },
  				"100%": { transform: "translateX(100%)", opacity: 0 },
  			},
  		},
  		animation: {
  			"accordion-down": "accordion-down 0.2s ease-out",
  			"accordion-up": "accordion-up 0.2s ease-out",
  			"float-slow": "float-slow 7s ease-in-out infinite",
  			"float-medium": "float-medium 5s ease-in-out infinite",
  			"float-fast": "float-fast 3s ease-in-out infinite",
  			"pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
  			"gradient-x": "gradient-x 15s ease infinite",
  			"reveal-text": "reveal-text 1.5s cubic-bezier(0.77, 0, 0.175, 1) forwards",
  			"line-reveal": "line-reveal 1.5s cubic-bezier(0.77, 0, 0.175, 1) 0.5s forwards",
  			"spotlight": "spotlight 2s ease forwards",
  			"scroll-down": "scroll-down 2s ease-in-out infinite",
  			"slide-in-right": "slide-in-right 5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 2s forwards",
  		},
  		transformStyle: {
  			"3d": "preserve-3d",
  		},
  		transform: {
  			"perspective-1000": "perspective(1000px)",
  			"perspective-1200": "perspective(1200px)",
  		},
  		transitionProperty: {
  			'height': 'height',
  			'spacing': 'margin, padding',
  		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
