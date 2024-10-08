import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
			maroon:{
				DEFAULT:"#780000"
			},
			red:{
				DEFAULT:"#c1121f"
			},
			cream:{
				DEFAULT:"#fdf0d5"
			},
			blue:{
				DEFAULT:"#003049"
			},
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		fontFamily:{
			poppins:'var(--font-poppins)'
		},
		
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
