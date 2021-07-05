module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      extend: {
        extend: {
          backgroundImage: theme => ({
            farm1: "url('./public/farm1.png')",
            farm2: "url('./public/farm2.png')",
            sunrise: "url('/sun-rise.svg')",
          }),
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
``