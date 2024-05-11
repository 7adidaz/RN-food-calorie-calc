module.exports = {
  presets: ["babel-preset-expo"],
  plugins: [
    "nativewind/babel",
    [
      "module-resolver",
      {
        extensions: [".tsx", ".ts", ".js", ".json"],
      },
    ],
  ],
};
