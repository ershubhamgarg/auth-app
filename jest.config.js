module.exports = {
  preset: "react-native",
  transformIgnorePatterns: [
    "node_modules/(?!(@react-navigation|react-native|@react-native|@react-native-community|expo|@expo|@unimodules)/)",
  ],
  setupFiles: ["<rootDir>/jest.setup.js"],
};
