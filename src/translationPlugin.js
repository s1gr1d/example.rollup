function debugLine(line, index) {
  console.log(`Line ${index + 1}: ${line}`);
}

// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping
// TC39 proposal: https://github.com/tc39/proposal-regex-escaping
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

const getNestedTranslation = (key, translations) => {
  const keyParts = key.split(".");

  return keyParts.reduce(
    (accTranslations, keyPart) => accTranslations && accTranslations[keyPart],
    translations,
  );
};

export default function translationPlugin({
  translations,
  prefix = "[t]",
} = {}) {
  const escapedPrefix = escapeRegExp(prefix);

  return {
    name: "rollup-plugin-translate",
    transform(code, id) {
      const lines = code.split("\n");
      lines.forEach((line, index) => {
        // If [t] is the prefix, it matches e.g. [t]key or [t]key.nestedKey
        const match = line.match(
          new RegExp(`${escapedPrefix}(\\w+(\\.\\w+)*)`),
        );

        if (match) {
          const key = match[1];
          const translation = getNestedTranslation(key, translations);
          if (translation) {
            lines[index] = line.replace(`${prefix}${key}`, translation);
          }
        }
      });
      return {
        code: lines.join("\n"),
      };
    },
  };
}
