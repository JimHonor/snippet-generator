export const insertTextAtCaret = (source = "", text = "", caretAt = 0) => {
  const textBeforeCaret = source.slice(0, caretAt);
  const textAfterCaret = source.slice(caretAt);
  return textBeforeCaret + text + textAfterCaret;
};

export const replaceAt = (source = "", text, start, end) => {
  const textBeforeStart = source.slice(0, start);
  const textAfterEnd = source.slice(end);
  return textBeforeStart + text + textAfterEnd;
};

export const getWordUnderCaret = (str = "", index = 0) => {
  const before = str.slice(0, index).match(/\w+$/);
  const after = str.slice(index).match(/^\w+/);

  if (before && after) {
    return [index - before[0].length, index + after[0].length];
  }

  if (before && !after) {
    return [index - before[0].length, index];
  }

  if (!before && after) {
    return [index, index + after[0].length];
  }
};
