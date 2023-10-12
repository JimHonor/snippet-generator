import { useState } from "react";

import SnippetEditor from "./components/SnippetEditor";
import SnippetPreview from "./components/SnippetPreview";
import { createSnippet, INITIAL_SNIPPET } from "./utils/snippet";

export default function App() {
  const [values, setValues] = useState({
    name: "",
    prefix: "",
    body: "",
  });

  const handleEditorChange = (values) => {
    setValues(values);
    setSnippet(createSnippet({ ...values }));
  };

  const [snippet, setSnippet] = useState(INITIAL_SNIPPET);

  return (
    <div className="p-4 min-h-screen flex flex-col">
      <header className="mb-4">
        <h1>VSCode Snippet Generator</h1>
      </header>
      <div className="flex gap-1 flex-[1_1_0]">
        <div className="w-1/2 p-1 bg-gray-300 rounded-sm">
          <SnippetEditor values={values} onChange={handleEditorChange} />
        </div>
        <div className="w-1/2 p-1 bg-gray-300 rounded-sm">
          <SnippetPreview snippet={snippet} />
        </div>
      </div>
    </div>
  );
}
