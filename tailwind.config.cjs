/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/*.{js,ts,jsx,tsx,mdx}",
	],
	safelist: [
		{
			pattern: /^items-/,
			variants: ["lg"],
		},
		{
			pattern: /^justify-/,
			variants: ["lg"],
		}
	],
	theme: {
		extend: {
			backgroundImage: {
				"desktop-banner": "url('../assets/CTA_Desktop_Bg.svg')"
			},
			fontFamily: {
				primary: ["Coconat"],
				demi: ["Coconat Demi"],
				secondary: ["Figtree"],
				secondaryMedium: ["Figtree Medium"],
			},
			colors: {
				primary: '#1C7E82',
				pepper: '#100E0E',
				fig: '#0F3A42',
				jade: '#26A4A1',
				cover: '#C2ECF0',
				coconut: '#FEFFF6',
				nashi: '#F2E3BC',
				lotus: '#F6C6C3',
				jasmine: '#F0F4F9',
				shell: '#CEB8B3',
				silk: '#F7C548',
				secondarySilk: '#ADB3E8',
				papaya: '#E16054',
				reishi: '#5E3139',
				turmeric: '#F3992F',
				dragonFruit: '#B12E58',
				jacarandah: '#511855',
				rattan: '#360216'
			},
			fontSize: {
				"h0": [
					"4.625rem",
					{
						lineHeight: 1,
					}],
				"h1": [
					"4.25rem",
					{
						"lineHeight": "1",
					}],
				"h2": [
					"3.25rem",
					{
						"lineHeight": "1.12",
					}
				],
				"h3": [
					"2.5rem",
					{
						"lineHeight": "1.1",
					}
				],
				"h4": [
					"2.125rem",
					{
						"lineHeight": "1.1",
					}
				],
				"h5": [
					"1.75rem", {
						"lineHeight": "1.1",
					}
				],
				"h6": [
					"1.5rem", {
						"lineHeight": "1.2",
					}
				],
				"h7": [
					"1.25rem", {
						"lineHeight": "1.2",
					}
				],
				"subheading0": [
					"1.25rem", {
						"lineHeight": "1",
						"fontWeight": 600
					}
				],
				"subheading1": [
					"1.125rem", {
						"lineHeight": "1",
						"fontWeight": 600
					}
				],
				"subheading2": [
					"1rem", {
						"lineHeight": "1.3",
						"fontWeight": 600
					}
				],
				"subheading3": [
					"0.875rem", {
						"lineHeight": "1.3",
						"fontWeight": 600
					}
				],
				"subheading4": [
					"0.75rem", {
						"lineHeight": "1.3",
						letterSpacing: "-0.01em",
						"fontWeight": 600
					}
				],
				"copy1": [
					"1.5rem",
					{
						"lineHeight": "1.3",
						letterSpacing: "0.005em",
					}
				],
				"copy2": [
					"1.375rem",
					{
						"lineHeight": "1.3",
						letterSpacing: "0.005em",
					}
				],
				"copy3": [
					"1.25rem",
					{
						"lineHeight": "1.3",
						letterSpacing: "0.01em",
					}
				],
				"copy4": [
					"1.125rem",
					{
						"lineHeight": "1.3",
						letterSpacing: "0.01em",
					}
				],
				"copy5": [
					"1rem",
					{
						"lineHeight": "1.3",
						letterSpacing: "0.01em",
					}
				],
				"copy6": [
					".875rem",
					{
						"lineHeight": "1.3",
						letterSpacing: "0.01em",
					}
				],
				"figtree-copy1": [
					".875rem",
					{
						"lineHeight": "1.3",
						letterSpacing: "-0.01em",
						"fontFamily": "Figtree"
					}
				],
				"figtree-copy2": [
					"1.125rem",
					{
						"lineHeight": "1.4",
						letterSpacing: "-0.01em",
						"fontFamily": "Figtree"
					}
				],
				"longform1": [
					"1.5rem",
					{
						"lineHeight": "1.4",
						letterSpacing: "-0.01em",
					}
				],
				"longform2": [
					"1.125rem",
					{
						"lineHeight": "1.4",
						letterSpacing: "-0.01em",
					}
				],
				"bigmarquee": [
					"7.5rem",
					{
						"lineHeight": ".8"
					}
				],
				"bigmarquee2": [
					"3.225rem",
					{
						"lineHeight": "0.8",
						letterSpacing: ".5%"
					}
				]
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
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [
		require("@tailwindcss/typography"),
		require("tailwindcss-animate")
	],
}

