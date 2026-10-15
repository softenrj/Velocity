/** @type {import('tailwindcss').Config} */
module.exports = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-geist-sans)', 'serif'],
                lora: ['var(--font-lora)', 'serif'],
            },
            animation: {
                'infinite-scroll': 'infinite-scroll 6s linear infinite',
            },
            keyframes: {
                'infinite-scroll': {
                    from: { transform: 'translateX(0)' },
                    to: { transform: 'translateX(-100%)' },
                },
            }
        },
    },
    plugins: [],
};
