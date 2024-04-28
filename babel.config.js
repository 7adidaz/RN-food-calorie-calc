module.exports = {
  presets: ["module:metro-react-native-babel-preset", "babel-preset-expo"],
  plugins: [
    "nativewind/babel",
    [
      "module-resolver",
      {
        extensions: [".tsx", ".ts", ".js", ".json"],
      },
    ],
    "react-native-reanimated/plugin",
  ],
};
