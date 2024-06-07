import translationPlugin from "./src/translationPlugin.js";

const translations = {
  greeting: "Hello",
  welcome: {
    greeting: "Welcome",
  },
};

export default {
  input: "src/main.js",
  plugins: [translationPlugin({ translations })],
  output: [
    {
      file: "bundle/main.js",
      format: "es",
    },
  ],
};
