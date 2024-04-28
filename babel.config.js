module.exports = {
  presets: ["module:metro-react-native-babel-preset", "babel-preset-expo"],
  plugins: [
    [
      "module-resolver",
      {
        extensions: [".tsx", ".ts", ".js", ".json"],
      },
    ],
    "react-native-reanimated/plugin",
  ],
};
