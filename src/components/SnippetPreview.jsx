export default function SnippetPreview({ snippet }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(snippet);
  };

  return (
    <div className="bg-white p-2 h-full relative">
      <div className="whitespace-pre-wrap">{snippet}</div>
      <button
        className="absolute right-1 bottom-1 px-4 py-2"
        onClick={handleCopy}
      >
        Copy snippet
      </button>
    </div>
  );
}
