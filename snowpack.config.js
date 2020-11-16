module.exports = {
  mount: {
    public: '/',
    src: '/_dist_',
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
    '@snowpack/plugin-sass',
    "@snowpack/plugin-postcss",
    ["@snowpack/plugin-build-script", {"cmd": "postcss", "input": [".scss"], "output": [".css"]}]
  ],
};