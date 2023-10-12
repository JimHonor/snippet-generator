const indentation = "  ";

export const createSnippet = (
  { name, prefix, body } = { name: "", prefix: "", body: "" }
) => {
  const lines = [
    `"${name}": {`,
    `${indentation}"prefix": "${prefix}",`,
    `${indentation}"body": [`,
    toBody(body),
    `${indentation}]`,
    "}",
  ];

  const snippet = lines.join("\n");

  return snippet;
};

const toBody = (body = "") => {
  const newline = body.match("\n");

  if (newline) {
    const bodies = body.split("\n");
    body = bodies.map((b) => `${indentation}${indentation}"${b}"`).join(",\n");
  } else {
    body = `${indentation}${indentation}"${body}"`;
  }

  return body;
};

export const INITIAL_SNIPPET = createSnippet({ name: "", prefix: "", body: "" });