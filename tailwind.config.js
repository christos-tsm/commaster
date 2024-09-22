import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Geologica', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                black: '#1b263b',
                'theme-primary': '#23216E',
                'theme-primary-darken': '#1D1B58',
                'theme-secondary': '#45D2B0',
            }
        },
    },

    plugins: [forms],
};
