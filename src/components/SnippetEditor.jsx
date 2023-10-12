import { getWordUnderCaret, replaceAt } from "@src/utils/string";
import { useState } from "react";
import { useEffect } from "react";

export default function SnippetEditor({
  values = {
    name: "",
    prefix: "",
    body: "",
  },
  onChange,
}) {
  const handleChange = (key) => (e) => {
    onChange({ ...values, [key]: e.target.value });
  };

  const [selection, setSelection] = useState({
    start: 0,
    end: 0,
  });

  const handleBodyKeydown = (e) => {
    const { selectionStart, selectionEnd } = e.target;
    const placeholderIds = ["0", "1", "2", "3"];

    if (e.ctrlKey && placeholderIds.includes(e.key)) {
      e.preventDefault(); // prevent trigger tab toggling

      const placeholder = getPlaceholderToInsert(e.key);

      let newBody;
      if (selectionStart === selectionEnd) {
        newBody = insertTextAtCaret(
          values.body,
          getPlaceholderToInsert(e.key),
          selectionStart
        );
      } else {
        newBody = replaceAt(
          values.body,
          placeholder,
          selectionStart,
          selectionEnd
        );
      }

      onChange({ ...values, body: newBody });

      setSelection({
        start: getBaseSelectionStart(e.key) + selectionStart,
        end: getBaseSelectionEnd(e.key) + selectionStart,
      });

      return;
    }

    if (e.ctrlKey && e.key === "d") {
      e.preventDefault();

      const word = getWordUnderCaret(values.body, selectionStart);
      if (word) {
        const [start, end] = word;
        setSelection({ start, end });
      }
    }
  };

  useEffect(() => {
    const textareaEl = document.querySelector("textarea");
    textareaEl.setSelectionRange(selection.start, selection.end);
  }, [selection]);

  return (
    <div className="flex flex-col h-full">
      <div className="mb-1 flex gap-1">
        <input
          className="flex-[2_2_0] p-2"
          type="text"
          placeholder="Name..."
          value={values.name}
          onChange={handleChange("name")}
        />
        <input
          className="flex-[1_1_0] p-2"
          type="text"
          placeholder="Prefix..."
          value={values.prefix}
          onChange={handleChange("prefix")}
        />
      </div>
      <textarea
        className="h-full p-2 resize-none"
        placeholder="Body..."
        value={values.body}
        onChange={handleChange("body")}
        onKeyDown={handleBodyKeydown}
      ></textarea>
    </div>
  );
}

const insertTextAtCaret = (source = "", text = "", caretAt = 0) => {
  const textBeforeCaret = source.slice(0, caretAt);
  const textAfterCaret = source.slice(caretAt);
  return textBeforeCaret + text + textAfterCaret;
};

const getPlaceholderToInsert = (placeholderId) => {
  if (placeholderId === "0") {
    return "$0";
  } else {
    return `\${${placeholderId}:valuable}`;
  }
};

const getBaseSelectionStart = (placeholderId) =>
  placeholderId === "0" ? 2 : 4;

const getBaseSelectionEnd = (placeholderId) => (placeholderId === "0" ? 2 : 12);
