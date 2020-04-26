module.exports = function override(config) {
  require('react-app-rewire-postcss')(config, {
    plugins: [
      require('tailwindcss')(require('./tailwind.config')),
      require('autoprefixer')(),
    ],
  })

  return config
}
